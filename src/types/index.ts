export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export type VehicleType = 'car' | 'bike';

export type QueryStatus = 'new' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

export interface InspectionQuery {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleType: VehicleType;
  vehicleMakeModel: string;
  vehicleYear: number;
  vehicleRegNumber?: string;
  serviceId: string;
  serviceName: string;
  inspectionAddress: string;
  city: string;
  preferredDate: string;
  preferredTimeSlot?: string;
  customerNotes?: string;
  sellerType?: string;
  sellerName?: string;
  sellerPhone?: string;
  status: QueryStatus;
  assignedOrgId?: string;
  assignedOrgName?: string;
  assignedAt?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrgStatus = 'active' | 'inactive' | 'pending_verification';

export interface InspectorMember {
  id: string;
  name: string;
  phone: string;
  role?: string;
  specialization: 'all' | 'car' | 'bike';
  experienceYears?: number;
  certification?: string;
  certifications?: string[];
}

export interface Organization {
  id: string;
  name: string;
  gstin: string;
  contactPerson: string;
  designation?: string;
  email: string;
  phone: string;
  cities: string[];
  vehicleTypes: VehicleType[];
  slaHours: number;
  status: OrgStatus;
  leadCount: number;
  completedCount: number;
  equipment?: string[];
  inspectors?: InspectorMember[];
  notes?: string;
  createdAt: string;
}

export type FeedbackStatus = 'pending_review' | 'approved' | 'rejected';

export interface Feedback {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  vehicleInfo: string;
  city: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  wouldRecommend: boolean;
  status: FeedbackStatus;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  category: VehicleType;
  tagline: string;
  badge?: string;
  price?: number;
  originalPrice?: number;
  duration: string;
  checklistCount: number;
  features: string[];
  description: string;
  popular?: boolean;
  iconName: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
}

