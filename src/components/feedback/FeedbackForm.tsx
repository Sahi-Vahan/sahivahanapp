import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ThumbsUp,
  Car,
  Bike,
  Check,
  MessageSquare,
  Shield,
  Clock,
  Award,
  BadgeCheck,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../common/Button';
import { Select } from '../common/Select';

interface FormErrors {
  vehicleInfo?: string;
  comment?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface FeedbackFormProps {
  variant?: 'page' | 'modal';
  onSuccess?: () => void;
  onCancel?: () => void;
  defaultCity?: string;
  defaultVehicle?: string;
}

const CAR_MAKES = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 'Kia', 'Skoda'];
const BIKE_MAKES = ['Royal Enfield', 'KTM', 'Yamaha', 'Bajaj', 'TVS', 'Honda', 'Kawasaki', 'Triumph'];

const REVIEW_SUGGESTIONS = [
  'Technician arrived on-time at seller doorstep',
  'OBD scan uncovered hidden ECU error codes',
  'Digital paint gauge revealed repainted panels',
  'Detailed suspension & chassis check',
  'Negotiated a better price with the report'
];

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  variant = 'page',
  onSuccess,
  onCancel,
  defaultCity = 'Chandigarh',
  defaultVehicle = ''
}) => {
  const { user, loginUser } = useAuth();
  const { addFeedback } = useAppData();

  // Form State
  const [vehicleType, setVehicleType] = useState<'car' | 'bike'>('car');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [vehicleInfo, setVehicleInfo] = useState(defaultVehicle);
  const [city, setCity] = useState(defaultCity);
  const [comment, setComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);

  // Reviewer details
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');

  // Validation
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setReviewerName(user.fullName || '');
      setReviewerEmail(user.email || '');
    }
  }, [user]);

  const activeRating = hoverRating || rating;

  const ratingLabels: Record<number, { text: string; badge: string; color: string; bg: string }> = {
    5: { text: 'Outstanding inspection!', badge: '★★★★★ 5.0 Exceptional', color: 'text-amber-800 border-amber-300', bg: 'bg-amber-50' },
    4: { text: 'Very good service & report', badge: '★★★★☆ 4.0 Very Good', color: 'text-emerald-800 border-emerald-300', bg: 'bg-emerald-50' },
    3: { text: 'Average experience', badge: '★★★☆☆ 3.0 Average', color: 'text-slate-800 border-slate-300', bg: 'bg-slate-100' },
    2: { text: 'Needs improvement', badge: '★★☆☆☆ 2.0 Mediocre', color: 'text-orange-800 border-orange-300', bg: 'bg-orange-50' },
    1: { text: 'Disappointing inspection', badge: '★☆☆☆☆ 1.0 Poor', color: 'text-rose-800 border-rose-300', bg: 'bg-rose-50' }
  };

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'vehicleInfo':
        if (!value || !value.trim()) {
          return 'Please enter vehicle Make, Model & Variant (e.g. Hyundai Creta SX, Swift VXi, Classic 350).';
        }
        if (value.trim().length < 2) {
          return 'Please enter at least 2 characters.';
        }
        return undefined;

      case 'comment':
        if (!value || !value.trim()) {
          return 'Please write a brief sentence about your inspection experience.';
        }
        if (value.trim().length < 10) {
          return 'Please write at least 10 characters (e.g. Inspector was very thorough and checked all panels).';
        }
        return undefined;

      case 'reviewerName':
        if (!value || !value.trim()) {
          return 'Your name is required.';
        }
        return undefined;

      case 'reviewerEmail':
        if (!value || !value.trim()) {
          return 'Email address is required to verify your review.';
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (): FormErrors => {
    return {
      vehicleInfo: validateField('vehicleInfo', vehicleInfo),
      comment: validateField('comment', comment),
      reviewerName: validateField('reviewerName', reviewerName),
      reviewerEmail: validateField('reviewerEmail', reviewerEmail),
    };
  };

  const handleBlur = (field: string, value: any) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: any, setter: (val: any) => void) => {
    setter(value);
    if (touched[field] || submitAttempted) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSelectMakeChip = (make: string) => {
    if (!vehicleInfo.trim()) {
      setVehicleInfo(`${make} `);
    } else if (!vehicleInfo.toLowerCase().includes(make.toLowerCase())) {
      setVehicleInfo(`${make} ${vehicleInfo.trim()}`);
    }
    setTouched(prev => ({ ...prev, vehicleInfo: true }));
    setErrors(prev => ({ ...prev, vehicleInfo: undefined }));
  };

  const handleAddSuggestionToComment = (suggestion: string) => {
    if (!comment.trim()) {
      setComment(suggestion + '. ');
    } else {
      setComment(prev => `${prev.trim()} ${suggestion}. `);
    }
    setTouched(prev => ({ ...prev, comment: true }));
    setErrors(prev => ({ ...prev, comment: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validateAll();
    const hasErrors = Object.values(validationErrors).some(err => err !== undefined);

    if (hasErrors) {
      setErrors(validationErrors);
      setTouched({
        vehicleInfo: true,
        comment: true,
        reviewerName: true,
        reviewerEmail: true,
      });

      const firstErrorKey = Object.keys(validationErrors).find(
        key => validationErrors[key as keyof FormErrors] !== undefined
      );
      if (firstErrorKey) {
        const el = document.getElementById(variant === 'modal' ? `modal-${firstErrorKey}` : firstErrorKey);
        if (el) {
          el.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);
    try {
      let currentUserId = user?.id;
      if (!user) {
        const loggedIn = await loginUser(reviewerEmail.trim(), reviewerName.trim());
        currentUserId = loggedIn.id;
      }

      const autoTitle = comment.length > 50
        ? comment.slice(0, 48).trim() + '...'
        : comment.trim();

      await addFeedback({
        userId: currentUserId || 'usr-guest',
        customerName: reviewerName.trim(),
        customerEmail: reviewerEmail.trim(),
        vehicleInfo: vehicleInfo.trim(),
        city,
        rating,
        title: autoTitle,
        comment: comment.trim(),
        wouldRecommend
      });

      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isModal = variant === 'modal';

  /* -------------------------------------------------------------
     1. COMPACT MODAL FORM (ZERO SCROLLING: PRODUCTION-GRADE UX)
     ------------------------------------------------------------- */
  const modalFormJSX = (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5 text-left">
      {/* Friendly Error Alert Banner on Submit Attempt */}
      {submitAttempted && Object.values(errors).some(Boolean) && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-900 animate-in fade-in duration-150 shadow-2xs">
          <div className="p-1 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-rose-900">Please complete the required details below</p>
            <p className="text-rose-700 text-[11px] leading-snug">
              Add the vehicle make/model and a brief note on your inspection experience to publish your review.
            </p>
          </div>
        </div>
      )}

      {/* 1. Star Rating (Ultra-compact inline strip) */}
      <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-700">Rating:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5 transition-transform hover:scale-125 focus:outline-hidden"
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    activeRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-200 hover:text-amber-200'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${ratingLabels[activeRating].bg} ${ratingLabels[activeRating].color}`}>
          {ratingLabels[activeRating].badge}
        </span>
      </div>

      {/* 2. Vehicle (Make, Model) + City on a single row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-7 space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="modal-vehicleInfo" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Vehicle (Make & Model) *
            </label>
            <div className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 p-0.5 rounded-md">
              <button
                type="button"
                onClick={() => setVehicleType('car')}
                className={`px-1.5 py-0.5 rounded transition-colors ${vehicleType === 'car' ? 'bg-[#154D3F] text-white shadow-2xs' : 'text-slate-500'}`}
              >
                Car
              </button>
              <button
                type="button"
                onClick={() => setVehicleType('bike')}
                className={`px-1.5 py-0.5 rounded transition-colors ${vehicleType === 'bike' ? 'bg-[#154D3F] text-white shadow-2xs' : 'text-slate-500'}`}
              >
                Bike
              </button>
            </div>
          </div>
          
          <div className="relative">
            <input
              id="modal-vehicleInfo"
              type="text"
              placeholder={vehicleType === 'car' ? 'e.g. 2021 Hyundai Creta SX' : 'e.g. Royal Enfield Classic 350'}
              value={vehicleInfo}
              onChange={e => handleChange('vehicleInfo', e.target.value, setVehicleInfo)}
              onBlur={e => handleBlur('vehicleInfo', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs transition-all focus:outline-hidden ${
                errors.vehicleInfo && touched.vehicleInfo
                  ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-1 focus:ring-rose-200'
                  : touched.vehicleInfo && !errors.vehicleInfo && vehicleInfo.trim().length >= 2
                  ? 'border-emerald-400/80 bg-emerald-50/10 focus:border-[#154D3F]'
                  : 'border-slate-300 focus:border-[#154D3F]'
              }`}
            />
            {touched.vehicleInfo && !errors.vehicleInfo && vehicleInfo.trim().length >= 2 && (
              <Check className="w-3.5 h-3.5 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2" />
            )}
          </div>

          {errors.vehicleInfo && touched.vehicleInfo && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg animate-in fade-in duration-150">
              <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
              <span>Please enter vehicle Make & Model (e.g. Creta SX, Swift VXi, Classic 350)</span>
            </div>
          )}

          {/* Quick Make Chips in Modal */}
          <div className="flex items-center gap-1 flex-wrap pt-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-0.5">Quick:</span>
            {(vehicleType === 'car' ? ['Maruti', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota'] : ['Royal Enfield', 'Honda', 'Bajaj', 'Yamaha', 'TVS', 'KTM']).map(make => (
              <button
                key={make}
                type="button"
                onClick={() => handleSelectMakeChip(make)}
                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 hover:text-[#154D3F] hover:border-emerald-200 text-slate-700 border border-slate-200/80 font-medium transition-all"
              >
                +{make}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-5">
          <Select
            label="Inspection City *"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="text-xs font-semibold py-2"
          >
            <option value="Chandigarh">Chandigarh</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
          </Select>
        </div>
      </div>

      {/* 3. Review Observations */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label htmlFor="modal-comment" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Your Review & Observations *
          </label>
          {touched.comment && !errors.comment && comment.trim().length >= 10 && (
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-3 h-3" /> Complete
            </span>
          )}
        </div>
        
        <textarea
          id="modal-comment"
          rows={2}
          placeholder="How was the technician? Did the report or paint gauge reveal hidden defects or give negotiating leverage?"
          value={comment}
          onChange={e => handleChange('comment', e.target.value, setComment)}
          onBlur={e => handleBlur('comment', e.target.value)}
          className={`w-full px-3 py-2 rounded-xl border text-xs leading-relaxed transition-all focus:outline-hidden ${
            errors.comment && touched.comment
              ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-1 focus:ring-rose-200'
              : touched.comment && !errors.comment && comment.trim().length >= 10
              ? 'border-emerald-400/80 bg-emerald-50/10 focus:border-[#154D3F]'
              : 'border-slate-300 focus:border-[#154D3F]'
          }`}
        />

        {errors.comment && touched.comment && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg animate-in fade-in duration-150">
            <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
            <span>Please write a few words about your inspection experience (min 10 characters)</span>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1 flex-wrap pt-0.5">
          <span className="text-[10px] font-bold text-slate-400 mr-0.5">Ideas:</span>
          {[
            'On-time & thorough inspector',
            'OBD scan uncovered hidden codes',
            'Digital paint gauge found repainted panels',
            'Helped negotiate better price'
          ].map((idea, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddSuggestionToComment(idea)}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 text-slate-600 transition-colors"
            >
              +{idea}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Recommendation & User Identity Inline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={wouldRecommend}
            onChange={e => setWouldRecommend(e.target.checked)}
            className="w-4 h-4 rounded text-[#154D3F] focus:ring-[#154D3F] border-slate-300"
          />
          <span>I recommend SahiVahan to buyers</span>
        </label>

        {user ? (
          <span className="text-[11px] text-slate-500 font-medium">
            Posting as <strong className="text-slate-800">{user.fullName}</strong> (Verified)
          </span>
        ) : (
          <button
            type="button"
            onClick={() => loginUser('rahul.verma@gmail.com', 'Rahul Verma', '+91 98765 43210')}
            className="text-[11px] text-[#154D3F] hover:underline font-bold"
          >
            Auto-fill Rahul Verma (Demo)
          </button>
        )}
      </div>

      {/* Guest Name & Email if not logged in */}
      {!user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <div>
            <input
              id="modal-reviewerName"
              type="text"
              placeholder="Your Name *"
              value={reviewerName}
              onChange={e => handleChange('reviewerName', e.target.value, setReviewerName)}
              onBlur={e => handleBlur('reviewerName', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border text-xs"
            />
          </div>
          <div>
            <input
              id="modal-reviewerEmail"
              type="email"
              placeholder="Your Email *"
              value={reviewerEmail}
              onChange={e => handleChange('reviewerEmail', e.target.value, setReviewerEmail)}
              onBlur={e => handleBlur('reviewerEmail', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border text-xs"
            />
          </div>
        </div>
      )}

      {/* 5. Direct Action Footer - Always visible without scrolling */}
      <div className="pt-2 flex items-center gap-2.5">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="w-1/3 text-xs font-bold py-2.5 justify-center"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          isLoading={isSubmitting}
          className={`${onCancel ? 'w-2/3' : 'w-full'} font-black text-xs py-2.5 shadow-md justify-center`}
        >
          Submit Review in 30 Sec &rarr;
        </Button>
      </div>
    </form>
  );

  /* -------------------------------------------------------------
     2. FULL PAGE FORM (SPACIOUS 2-COLUMN VIEW FOR /feedback)
     ------------------------------------------------------------- */
  const pageFormJSX = (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-xl space-y-6 relative">
      {/* Friendly Error Alert Banner */}
      {submitAttempted && Object.values(errors).some(Boolean) && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-900 animate-in fade-in duration-150 shadow-2xs">
          <div className="p-1 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-rose-950">Please complete the required fields below</p>
            <p className="text-rose-700 text-xs mt-0.5">
              Add the vehicle make/model and a brief note on your inspection experience to publish your review.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
        {/* Star Rating */}
        <div className="text-center py-2 sm:py-3 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100 p-4 space-y-2">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            How would you rate your inspection? <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 sm:p-1.5 transition-all duration-150 hover:scale-125 focus:outline-hidden"
                title={`${star} Star`}
              >
                <Star
                  className={`w-9 h-9 sm:w-11 sm:h-11 transition-all ${
                    activeRating >= star
                      ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                      : 'text-slate-200 hover:text-amber-200'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <span className={`text-xs font-bold px-3.5 py-1 rounded-full border ${ratingLabels[activeRating].bg} ${ratingLabels[activeRating].color} shadow-2xs transition-all`}>
              {ratingLabels[activeRating].badge} — {ratingLabels[activeRating].text}
            </span>
          </div>
        </div>

        {/* Vehicle & City */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Vehicle Inspected <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setVehicleType('car')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  vehicleType === 'car'
                    ? 'bg-white text-[#154D3F] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Car</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicleType('bike')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  vehicleType === 'bike'
                    ? 'bg-white text-[#154D3F] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Bike</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            <div className="sm:col-span-7 space-y-1.5">
              <div className="relative">
                <input
                  id="vehicleInfo"
                  type="text"
                  placeholder={vehicleType === 'car' ? 'e.g. 2021 Hyundai Creta SX Diesel' : 'e.g. Royal Enfield Classic 350 Stealth'}
                  value={vehicleInfo}
                  onChange={e => handleChange('vehicleInfo', e.target.value, setVehicleInfo)}
                  onBlur={e => handleBlur('vehicleInfo', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                    errors.vehicleInfo && touched.vehicleInfo
                      ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
                  }`}
                />
                {touched.vehicleInfo && !errors.vehicleInfo && vehicleInfo.length > 2 && (
                  <Check className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {errors.vehicleInfo && touched.vehicleInfo && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{errors.vehicleInfo}</span>
                </div>
              )}
            </div>

            <div className="sm:col-span-5">
              <Select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="text-sm font-semibold"
              >
                <option value="Chandigarh">Chandigarh</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Make:</span>
            {(vehicleType === 'car' ? CAR_MAKES : BIKE_MAKES).map(make => (
              <button
                key={make}
                type="button"
                onClick={() => handleSelectMakeChip(make)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-[#154D3F] hover:border-emerald-200 text-slate-700 border border-slate-200/90 font-medium transition-all"
              >
                + {make}
              </button>
            ))}
          </div>
        </div>

        {/* Review Observations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="comment" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Your Review & Observations <span className="text-red-500">*</span>
            </label>
            {touched.comment && !errors.comment && comment.length >= 10 && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Complete
              </span>
            )}
          </div>
          
          <textarea
            id="comment"
            rows={4}
            placeholder="Share your experience: How punctual was the technician? Did the diagnostic scanner or paint meter uncover hidden repainting, error codes, or flood damage? Did it give you negotiating leverage?"
            value={comment}
            onChange={e => handleChange('comment', e.target.value, setComment)}
            onBlur={e => handleBlur('comment', e.target.value)}
            className={`w-full px-4 py-3 rounded-2xl border text-sm leading-relaxed transition-all focus:outline-hidden ${
              errors.comment && touched.comment
                ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-300 focus:border-[#154D3F] focus:ring-2 focus:ring-[#154D3F]/15'
            }`}
          />

          {errors.comment && touched.comment && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl mt-1.5 animate-in fade-in duration-150">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>{errors.comment}</span>
            </div>
          )}

          <div className="pt-1">
            <p className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Tap to append ideas to your review:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {REVIEW_SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddSuggestionToComment(suggestion)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-600 hover:text-emerald-900 border border-slate-200/80 transition-colors text-left"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation Switcher */}
        <div
          onClick={() => setWouldRecommend(!wouldRecommend)}
          className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
            wouldRecommend
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              wouldRecommend ? 'bg-[#154D3F] text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">
                I recommend SahiVahan to used vehicle buyers
              </p>
              <p className="text-[11px] text-slate-500">
                Helps future buyers know if the inspection gave peace of mind
              </p>
            </div>
          </div>
          
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
            wouldRecommend
              ? 'bg-[#154D3F] border-[#154D3F] text-white'
              : 'border-slate-300 bg-white'
          }`}>
            {wouldRecommend && <Check className="w-4 h-4" />}
          </div>
        </div>

        {/* Reviewer Identity */}
        {user ? (
          <div className="bg-[#E8F5EE]/60 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#154D3F] text-white flex items-center justify-center font-black text-sm">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
              <div>
                <span className="font-bold text-slate-900 text-sm block">{user.fullName}</span>
                <span className="text-slate-500 text-xs">{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-[#154D3F] font-bold text-[11px]">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Customer</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
                Reviewer Verification
              </span>
              <button
                type="button"
                onClick={() => loginUser('rahul.verma@gmail.com', 'Rahul Verma', '+91 98765 43210')}
                className="text-[#154D3F] hover:text-emerald-700 font-bold flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3 h-3 text-amber-500" /> Auto-fill Demo Account
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <input
                  id="reviewerName"
                  type="text"
                  placeholder="Your Name *"
                  value={reviewerName}
                  onChange={e => handleChange('reviewerName', e.target.value, setReviewerName)}
                  onBlur={e => handleBlur('reviewerName', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs transition-all focus:outline-hidden ${
                    errors.reviewerName && touched.reviewerName
                      ? 'border-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#154D3F]'
                  }`}
                />
                {errors.reviewerName && touched.reviewerName && (
                  <p className="text-[11px] font-semibold text-red-600 mt-1">{errors.reviewerName}</p>
                )}
              </div>

              <div>
                <input
                  id="reviewerEmail"
                  type="email"
                  placeholder="Your Email Address *"
                  value={reviewerEmail}
                  onChange={e => handleChange('reviewerEmail', e.target.value, setReviewerEmail)}
                  onBlur={e => handleBlur('reviewerEmail', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs transition-all focus:outline-hidden ${
                    errors.reviewerEmail && touched.reviewerEmail
                      ? 'border-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:border-[#154D3F]'
                  }`}
                />
                {errors.reviewerEmail && touched.reviewerEmail && (
                  <p className="text-[11px] font-semibold text-red-600 mt-1">{errors.reviewerEmail}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2 space-y-2.5">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-black text-sm py-3.5 shadow-lg shadow-emerald-950/15 justify-center"
          >
            Submit Inspection Review &rarr;
          </Button>

          <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Impartial. Zero dealership commissions or paid takedowns.</span>
          </div>
        </div>
      </form>
    </div>
  );

  /* Success Screen */
  const successJSX = (
    <div className={`text-center space-y-4 animate-in fade-in duration-300 ${isModal ? 'py-3' : 'bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl max-w-2xl mx-auto'}`}>
      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
          Review Received
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Thank You, {reviewerName || 'Customer'}!
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Your feedback for <strong>{vehicleInfo}</strong> in <strong>{city}</strong> has been logged.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-left space-y-2 text-xs max-w-md mx-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span className="text-slate-500 font-medium">Your Rating:</span>
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-slate-900 ml-1 font-black">({rating}/5)</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span className="text-slate-500 font-medium">Vehicle & Hub:</span>
          <span className="font-bold text-slate-900">{vehicleInfo} • {city}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Status:</span>
          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            Pending 2-Hr Verification
          </span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
        {isModal && onCancel ? (
          <Button variant="primary" onClick={onCancel} className="w-full sm:w-auto text-xs font-bold py-2.5 px-6">
            Close Window
          </Button>
        ) : (
          <>
            <Link to="/reviews" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto text-xs font-bold">
                Browse All Customer Reviews
              </Button>
            </Link>
            <Link to="/admin/feedback" className="w-full sm:w-auto">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center text-xs font-bold">
                View in Admin Queue &rarr;
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );

  /* If already submitted, return the receipt */
  if (isSubmitted) {
    return successJSX;
  }

  /* If inside a modal, render pure compact no-scroll form */
  if (isModal) {
    return modalFormJSX;
  }

  /* Standalone Page (/feedback): Full-width 2-column layout */
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN (5 cols): Live Interactive Review Preview & Trust Pillars */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Live Updating Review Card Preview */}
          <div className="bg-gradient-to-br from-[#0B251E] to-[#061713] text-white rounded-3xl p-6 sm:p-7 border border-emerald-800/40 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300">
                  Live Review Preview
                </span>
              </div>
              <span className="text-[10px] text-emerald-400/80 font-mono">
                Updates in real-time
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
                    />
                  ))}
                  <span className="text-white text-xs font-bold ml-1">
                    {rating}.0
                  </span>
                </div>
                
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-700/50">
                  {city}
                </span>
              </div>

              <p className="text-xs text-emerald-50/90 leading-relaxed font-normal min-h-[48px] italic">
                "{comment.trim() || 'Share how the technician inspected the vehicle, discovered hidden defects, or verified odometer & paint condition before you paid...'}"
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-white">
                    {user?.fullName || reviewerName.trim() || 'Verified Customer'}
                  </p>
                  <p className="text-[11px] text-emerald-200/80">
                    {vehicleInfo.trim() || 'Vehicle Make & Model'}
                  </p>
                </div>

                {wouldRecommend && (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded-md border border-emerald-500/40 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Recommends SahiVahan
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-200/70 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Published on customer reviews feed upon quick 2-hr verification.</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-[#154D3F]" />
              <span>Why SahiVahan Reviews Are 100% Unbiased</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>No Dealer Gatekeeping:</strong> Dealerships and used-car dealers cannot pay or lobby to delete candid inspection feedback.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Inventory Kickbacks:</strong> SahiVahan never buys or sells vehicles; we exist solely to protect buyer interests.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Calibrated Diagnostic Proof:</strong> All reports feature raw digital paint microns and ECU error codes.
                </span>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Need immediate report help?</span>
              <a href="tel:18001237244" className="font-bold text-[#154D3F] hover:underline flex items-center gap-1">
                <span>1800-123-SAHI</span>
              </a>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (7 cols): The Review Form */}
        <div className="lg:col-span-7">
          {pageFormJSX}
        </div>

      </div>
    </div>
  );
};
