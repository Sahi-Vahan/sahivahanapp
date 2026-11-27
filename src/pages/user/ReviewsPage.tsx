import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ThumbsUp,
  MessageSquareHeart,
  Plus,
  Filter,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { FeedbackModal } from '../../components/feedback/FeedbackModal';
import { SEO } from '../../components/common/SEO';

export const ReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const { feedbacks } = useAppData();
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const approvedFeedbacks = feedbacks.filter(f => f.status === 'approved');
  const userPendingReviews = user
    ? feedbacks.filter(f => f.customerEmail === user.email && f.status === 'pending_review')
    : [];

  const filteredFeedbacks = selectedRating === 'all'
    ? approvedFeedbacks
    : approvedFeedbacks.filter(f => f.rating === selectedRating);

  const averageRating = approvedFeedbacks.length > 0
    ? (approvedFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / approvedFeedbacks.length).toFixed(1)
    : '4.9';

  const recommendationRate = approvedFeedbacks.length > 0
    ? Math.round((approvedFeedbacks.filter(f => f.wouldRecommend).length / approvedFeedbacks.length) * 100)
    : 98;

  return (
    <div className="space-y-4 pb-12">
      <SEO
        title="Customer Reviews & Ratings — 4.8★ Verified Inspections"
        description="Read authentic customer reviews from verified used car and bike buyers who booked SahiVahan pre-purchase forensic inspections across India."
        keywords="SahiVahan reviews, used car inspection review, vehicle audit customer rating, verified inspection feedback"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'SahiVahan Pre-Purchase Vehicle Inspection',
          description: 'Certified 140+ point forensic inspection for pre-owned cars and motorcycles across India.',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating,
            reviewCount: approvedFeedbacks.length || 1,
            bestRating: '5',
            worstRating: '1'
          }
        }}
      />

      {/* Compact Header (No excessive height) */}
      <section className="pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3.5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#154D3F]">
              <MessageSquareHeart className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Customer Feedback</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Customer Reviews & Experiences
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Authentic reviews from verified buyers who booked pre-purchase vehicle inspections with SahiVahan.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#154D3F] border border-emerald-200/80 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Unbiased & Independent</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Rating Score Card & Action */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl sm:text-5xl font-black text-[#154D3F]">{averageRating}</span>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  Based on {approvedFeedbacks.length} verified inspection reviews
                </p>
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-200 sm:pl-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 font-bold text-sm">
                <ThumbsUp className="w-4 h-4" />
                <span>{recommendationRate}% Recommendation Rate</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Buyers would recommend SahiVahan to family & friends
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setIsFeedbackModalOpen(true)}
              className="w-full sm:w-auto font-bold justify-center shadow-md"
              icon={<Plus className="w-4 h-4" />}
            >
              Write a Review
            </Button>
          </div>
        </div>

        {/* User's Pending Review Status Notification */}
        {userPendingReviews.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 animate-in fade-in duration-200">
            <div className="flex items-start sm:items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong>Your review is in moderation:</strong> You recently submitted a review for <strong>{userPendingReviews[0].vehicleInfo}</strong> ({userPendingReviews[0].city}). It is awaiting verification by operations and will appear live upon approval.
              </span>
            </div>
            <Link to="/admin/feedback" className="text-xs font-bold text-amber-800 hover:text-amber-950 underline shrink-0">
              Admin QA Dashboard &rarr;
            </Link>
          </div>
        )}

        {/* Rating Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {[
            { label: 'All Reviews', value: 'all' },
            { label: '5 Stars ★', value: 5 },
            { label: '4 Stars ★', value: 4 },
            { label: '3 Stars ★', value: 3 },
          ].map(opt => (
            <button
              key={opt.label}
              onClick={() => setSelectedRating(opt.value as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedRating === opt.value
                  ? 'bg-[#154D3F] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredFeedbacks.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="brand" size="sm">
                    Verified Buyer
                  </Badge>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">{item.title}</h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{item.customerName}</p>
                  <p className="text-slate-500 text-[11px]">{item.vehicleInfo} • {item.city}</p>
                </div>
                <div className="text-right">
                  {item.wouldRecommend && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 block mb-0.5">
                      ✓ Recommends
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400">{item.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal Variant */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
};

