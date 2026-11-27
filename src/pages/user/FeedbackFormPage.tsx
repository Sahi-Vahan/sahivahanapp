import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  MessageSquareHeart,
  ThumbsUp
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { FeedbackForm } from '../../components/feedback/FeedbackForm';
import { SEO } from '../../components/common/SEO';

export const FeedbackFormPage: React.FC = () => {
  const { feedbacks } = useAppData();

  const recentApprovedFeedbacks = feedbacks.filter(f => f.status === 'approved').slice(0, 3);

  return (
    <div className="pt-3 sm:pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5">
      <SEO
        title="Submit Customer Review & Inspection Experience"
        description="Share your pre-purchase car or bike inspection experience with SahiVahan. Help used vehicle buyers make informed, safe decisions."
        keywords="submit vehicle review, inspection feedback, SahiVahan customer ratings, verified car review"
      />

      {/* Refined Page Header (Snug & Clean) */}
      <section className="border-b border-slate-200 pb-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            {/* Breadcrumb & Pill */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/reviews" className="hover:text-emerald-700 transition-colors">Reviews</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#154D3F] font-bold">Submit Review</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Rate & Review Your Pre-Purchase Inspection
            </h1>
            
            <p className="text-xs text-slate-500 max-w-2xl">
              Your candid evaluation helps thousands of used car and bike buyers avoid accident-damaged lemons and rolled-back meters.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all bg-white shadow-2xs"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-emerald-600" />
              <span>Browse All Reviews</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main 2-Column Responsive Layout */}
      <FeedbackForm variant="page" />

      {/* Recent Live Testimonials Gallery (Social Proof Band Across the Bottom) */}
      <section className="pt-4 border-t border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Recent Verified Customer Reviews
            </h3>
            <p className="text-xs text-slate-500">
              Real inspection stories published by buyers across our 7 regional operating hubs.
            </p>
          </div>

          <Link
            to="/reviews"
            className="text-xs font-bold text-[#154D3F] hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all reviews & ratings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentApprovedFeedbacks.map(fb => (
            <div
              key={fb.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-800 ml-1">
                      {fb.rating}.0
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    {fb.city}
                  </span>
                </div>

                <p className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                  {fb.title}
                </p>
                
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  "{fb.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-slate-800 block">{fb.customerName}</span>
                  <span className="text-slate-400 text-[10px]">{fb.vehicleInfo}</span>
                </div>
                {fb.wouldRecommend && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 text-emerald-600" /> Recommends
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
