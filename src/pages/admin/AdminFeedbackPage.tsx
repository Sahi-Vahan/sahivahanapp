import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  Search,
  Filter,
  Sparkles,
  Eye,
  AlertCircle,
  ChevronRight,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { Badge, BadgeVariant } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Feedback, FeedbackStatus } from '../../types';

export const AdminFeedbackPage: React.FC = () => {
  const { feedbacks, updateFeedbackStatus, toggleFeedbackFeatured } = useAppData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeFeedback, setActiveFeedback] = useState<Feedback | null>(null);

  const filteredFeedbacks = feedbacks.filter(f => {
    const matchesSearch =
      f.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.vehicleInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || f.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: FeedbackStatus) => {
    const config: Record<FeedbackStatus, { label: string; dot: string; bg: string; text: string; border: string }> = {
      pending_review: {
        label: 'Pending Review',
        dot: 'bg-amber-500',
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200'
      },
      approved: {
        label: 'Approved & Live',
        dot: 'bg-emerald-500',
        bg: 'bg-emerald-50',
        text: 'text-emerald-800',
        border: 'border-emerald-200'
      },
      rejected: {
        label: 'Rejected',
        dot: 'bg-rose-500',
        bg: 'bg-rose-50',
        text: 'text-rose-800',
        border: 'border-rose-200'
      }
    };
    const c = config[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border whitespace-nowrap shadow-2xs ${c.bg} ${c.text} ${c.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
        <span>{c.label}</span>
      </span>
    );
  };

  const handleApprove = (feedbackId: string) => {
    updateFeedbackStatus(feedbackId, 'approved');
    if (activeFeedback?.id === feedbackId) {
      setActiveFeedback(prev => prev ? { ...prev, status: 'approved' } : null);
    }
  };

  const handleReject = (feedbackId: string) => {
    updateFeedbackStatus(feedbackId, 'rejected');
    if (activeFeedback?.id === feedbackId) {
      setActiveFeedback(prev => prev ? { ...prev, status: 'rejected' } : null);
    }
  };

  const handleToggleFeatured = (feedbackId: string) => {
    toggleFeedbackFeatured(feedbackId);
    if (activeFeedback?.id === feedbackId) {
      setActiveFeedback(prev => prev ? { ...prev, isFeatured: !prev.isFeatured } : null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Customer Feedback & Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Moderate submitted customer reviews before they are published on the public website.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer, vehicle or city..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F] text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 shrink-0" />
          <span className="font-bold text-[11px] uppercase text-slate-400 shrink-0">Status:</span>
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full appearance-none px-2.5 py-1.5 pr-8 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#154D3F]"
            >
              <option value="all">All Feedback ({feedbacks.length})</option>
              <option value="pending_review">Pending Review</option>
              <option value="approved">Approved & Published</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Feedback Cards (< md) */}
      <div className="md:hidden space-y-3">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs border border-slate-200">
            No customer feedback matches the filters.
          </div>
        ) : (
          filteredFeedbacks.map(f => (
            <div
              key={f.id}
              onClick={() => setActiveFeedback(f)}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3 active:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < f.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">{f.rating}.0</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {f.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
                      <span>Featured</span>
                    </span>
                  )}
                  {getStatusBadge(f.status)}
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-900 text-sm">"{f.title}"</p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">"{f.comment}"</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div>
                  <span className="font-bold text-slate-800 block">{f.customerName}</span>
                  <span className="text-[11px] text-slate-500">{f.vehicleInfo} • {f.city}</span>
                </div>

                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#E8F5EE] hover:text-[#154D3F] font-bold text-xs text-slate-700 transition-colors flex items-center gap-1"
                >
                  <span>Moderate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feedback Table (Desktop) */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-6 whitespace-nowrap">Review ID</th>
                <th className="py-3.5 px-6 whitespace-nowrap">Customer & Email</th>
                <th className="py-3.5 px-6 whitespace-nowrap">Vehicle & City</th>
                <th className="py-3.5 px-6">Rating & Headline</th>
                <th className="py-3.5 px-6 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-6 whitespace-nowrap text-center">Featured</th>
                <th className="py-3.5 px-6 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No customer feedback matches the filters.
                  </td>
                </tr>
              ) : (
                filteredFeedbacks.map(f => (
                  <tr
                    key={f.id}
                    onClick={() => setActiveFeedback(f)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {f.id}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="font-bold text-slate-900">{f.customerName}</p>
                      <p className="text-slate-500 text-[11px]">{f.customerEmail}</p>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="font-semibold text-slate-900">{f.vehicleInfo}</p>
                      <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{f.city}</span>
                      </p>
                    </td>

                    <td className="py-4 px-6 max-w-xs">
                      <div className="flex items-center gap-1 text-amber-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < f.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                        <span className="text-[11px] font-bold text-slate-700 ml-1">{f.rating}.0</span>
                      </div>
                      <p className="font-bold text-slate-900 line-clamp-1">{f.title}</p>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      {getStatusBadge(f.status)}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      {f.isFeatured ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFeatured(f.id);
                          }}
                          title="Click to remove from Homepage"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs transition-all active:scale-95 group"
                        >
                          <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
                          <span>Featured</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFeatured(f.id);
                          }}
                          title="Click to feature on Homepage"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900 text-slate-500 border border-slate-200 shadow-2xs transition-all active:scale-95 group"
                        >
                          <Sparkles className="w-3 h-3 text-slate-300 group-hover:text-amber-500 transition-colors" />
                          <span>Standard</span>
                        </button>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <Button
                        size="sm"
                        variant={f.status === 'pending_review' ? 'primary' : 'outline'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveFeedback(f);
                        }}
                      >
                        {f.status === 'pending_review' ? 'Moderate' : 'Inspect'}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Modal Popup */}
      {activeFeedback && (
        <Modal
          isOpen={!!activeFeedback}
          onClose={() => setActiveFeedback(null)}
          title={
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-bold text-slate-900">{activeFeedback.id}</span>
              {getStatusBadge(activeFeedback.status)}
            </div>
          }
          subtitle={`Customer Review by ${activeFeedback.customerName} (${activeFeedback.createdAt})`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Inspected Vehicle:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {activeFeedback.vehicleInfo} ({activeFeedback.city})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < activeFeedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base">{activeFeedback.title}</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 bg-white p-3 rounded-xl border border-slate-200">
                  "{activeFeedback.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">
                  Customer Email: <strong>{activeFeedback.customerEmail}</strong>
                </span>
                <span className="font-semibold text-emerald-800 flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {activeFeedback.wouldRecommend ? 'Recommends SahiVahan' : 'Does not recommend'}
                </span>
              </div>
            </div>

            {/* MODERATION ACTION BUTTONS */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Moderation Actions
              </h4>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5">
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full sm:w-auto"
                  onClick={() => handleApprove(activeFeedback.id)}
                  disabled={activeFeedback.status === 'approved'}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Approve & Publish to Public Site
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  className="w-full sm:w-auto"
                  onClick={() => handleReject(activeFeedback.id)}
                  disabled={activeFeedback.status === 'rejected'}
                  icon={<XCircle className="w-4 h-4" />}
                >
                  Reject / Hide Review
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => handleToggleFeatured(activeFeedback.id)}
                  icon={<Sparkles className="w-4 h-4 text-amber-500" />}
                >
                  {activeFeedback.isFeatured ? 'Remove from Featured' : 'Feature on Homepage'}
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => setActiveFeedback(null)}>
                Close Modal
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

