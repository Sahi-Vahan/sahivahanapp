import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Modal } from '../common/Modal';
import { FeedbackForm } from './FeedbackForm';

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultCity?: string;
  defaultVehicle?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultCity = 'Bengaluru',
  defaultVehicle = ''
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title={
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-base sm:text-lg font-black text-slate-900">
            Submit Customer Review
          </span>
        </div>
      }
      subtitle="Share your vehicle inspection experience in under 30 seconds"
    >
      <FeedbackForm
        variant="modal"
        defaultCity={defaultCity}
        defaultVehicle={defaultVehicle}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </Modal>
  );
};

