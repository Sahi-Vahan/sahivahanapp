import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InspectionQuery,
  Organization,
  Feedback,
  Service,
  QueryStatus,
  OrgStatus,
  FeedbackStatus
} from '../types';
import { BlogPost, BLOG_POSTS } from '../data/blogData';
import {
  INITIAL_SERVICES,
  INITIAL_ORGANIZATIONS,
  INITIAL_QUERIES,
  INITIAL_FEEDBACKS
} from '../data/mockData';

interface AppDataContextType {
  // Queries
  queries: InspectionQuery[];
  addQuery: (data: Omit<InspectionQuery, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<InspectionQuery>;
  assignQueryToOrg: (queryId: string, orgId: string, adminNotes?: string) => void;
  updateQueryStatus: (queryId: string, status: QueryStatus, adminNotes?: string) => void;
  updateQueryNotes: (queryId: string, adminNotes: string) => void;

  // Organizations
  organizations: Organization[];
  addOrganization: (data: Omit<Organization, 'id' | 'createdAt' | 'leadCount' | 'completedCount'>) => Promise<Organization>;
  updateOrganizationStatus: (orgId: string, status: OrgStatus) => void;
  updateOrganization: (orgId: string, data: Partial<Organization>) => void;

  // Feedbacks / Reviews
  feedbacks: Feedback[];
  addFeedback: (data: Omit<Feedback, 'id' | 'createdAt' | 'status'>) => Promise<Feedback>;
  updateFeedbackStatus: (feedbackId: string, status: FeedbackStatus) => void;
  toggleFeedbackFeatured: (feedbackId: string) => void;

  // Static / Dynamic catalogs
  services: Service[];
  blogs: BlogPost[];
  
  // Reset demo data helper
  resetToDefaultData: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const FEEDBACKS_DATA_VERSION = 'v3_clean_no_ev_no_pricing_chandigarh';

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Queries State
  const [queries, setQueries] = useState<InspectionQuery[]>(() => {
    try {
      const saved = localStorage.getItem('sv_queries');
      return saved ? JSON.parse(saved) : INITIAL_QUERIES;
    } catch {
      return INITIAL_QUERIES;
    }
  });

  // Organizations State
  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    try {
      const saved = localStorage.getItem('sv_organizations');
      return saved ? JSON.parse(saved) : INITIAL_ORGANIZATIONS;
    } catch {
      return INITIAL_ORGANIZATIONS;
    }
  });

  // Feedback State (Versioned to automatically clear outdated pricing / EV records)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    try {
      const version = localStorage.getItem('sv_feedbacks_version');
      const saved = localStorage.getItem('sv_feedbacks');
      if (version === FEEDBACKS_DATA_VERSION && saved) {
        const parsed = JSON.parse(saved);
        const hasStale = JSON.stringify(parsed).includes('₹') || JSON.stringify(parsed).includes('Nexon EV');
        if (!hasStale && Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      localStorage.setItem('sv_feedbacks_version', FEEDBACKS_DATA_VERSION);
      localStorage.setItem('sv_feedbacks', JSON.stringify(INITIAL_FEEDBACKS));
      return INITIAL_FEEDBACKS;
    } catch {
      return INITIAL_FEEDBACKS;
    }
  });

  // Services & Blogs State
  const [services] = useState<Service[]>(INITIAL_SERVICES);
  const [blogs] = useState<BlogPost[]>(BLOG_POSTS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sv_queries', JSON.stringify(queries));
  }, [queries]);

  useEffect(() => {
    localStorage.setItem('sv_organizations', JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem('sv_feedbacks', JSON.stringify(feedbacks));
    localStorage.setItem('sv_feedbacks_version', FEEDBACKS_DATA_VERSION);
  }, [feedbacks]);

  // Query Actions
  const addQuery = async (
    data: Omit<InspectionQuery, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<InspectionQuery> => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newQuery: InspectionQuery = {
      ...data,
      id: `SV-INQ-2026-${randomNum}`,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setQueries(prev => [newQuery, ...prev]);
    return newQuery;
  };

  const assignQueryToOrg = (queryId: string, orgId: string, adminNotes?: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (!org) return;

    setQueries(prev =>
      prev.map(q => {
        if (q.id === queryId) {
          return {
            ...q,
            assignedOrgId: orgId,
            assignedOrgName: org.name,
            assignedAt: new Date().toISOString(),
            status: 'assigned',
            adminNotes: adminNotes ? (q.adminNotes ? `${q.adminNotes}\n${adminNotes}` : adminNotes) : q.adminNotes,
            updatedAt: new Date().toISOString()
          };
        }
        return q;
      })
    );

    // Increment lead count on organization
    setOrganizations(prev =>
      prev.map(o => {
        if (o.id === orgId) {
          return { ...o, leadCount: o.leadCount + 1 };
        }
        return o;
      })
    );
  };

  const updateQueryStatus = (queryId: string, status: QueryStatus, adminNotes?: string) => {
    setQueries(prev =>
      prev.map(q => {
        if (q.id === queryId) {
          // If status changed to completed and it was assigned to an org, increment completedCount
          if (status === 'completed' && q.status !== 'completed' && q.assignedOrgId) {
            setOrganizations(orgs =>
              orgs.map(o => (o.id === q.assignedOrgId ? { ...o, completedCount: o.completedCount + 1 } : o))
            );
          }

          return {
            ...q,
            status,
            adminNotes: adminNotes ? (q.adminNotes ? `${q.adminNotes}\n${adminNotes}` : adminNotes) : q.adminNotes,
            updatedAt: new Date().toISOString()
          };
        }
        return q;
      })
    );
  };

  const updateQueryNotes = (queryId: string, adminNotes: string) => {
    setQueries(prev =>
      prev.map(q => (q.id === queryId ? { ...q, adminNotes, updatedAt: new Date().toISOString() } : q))
    );
  };

  // Organization Actions
  const addOrganization = async (
    data: Omit<Organization, 'id' | 'createdAt' | 'leadCount' | 'completedCount'>
  ): Promise<Organization> => {
    const code = (data.cities[0] || 'IND').slice(0, 3).toUpperCase();
    const count = organizations.length + 1;
    const newOrg: Organization = {
      ...data,
      id: `ORG-${code}-00${count}`,
      leadCount: 0,
      completedCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setOrganizations(prev => [newOrg, ...prev]);
    return newOrg;
  };

  const updateOrganizationStatus = (orgId: string, status: OrgStatus) => {
    setOrganizations(prev =>
      prev.map(o => (o.id === orgId ? { ...o, status } : o))
    );
  };

  const updateOrganization = (orgId: string, data: Partial<Organization>) => {
    setOrganizations(prev =>
      prev.map(o => (o.id === orgId ? { ...o, ...data } : o))
    );
  };

  // Feedback Actions
  const addFeedback = async (
    data: Omit<Feedback, 'id' | 'createdAt' | 'status'>
  ): Promise<Feedback> => {
    const newFeedback: Feedback = {
      ...data,
      id: `REV-${1000 + feedbacks.length + 1}`,
      status: 'pending_review',
      isFeatured: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    return newFeedback;
  };

  const updateFeedbackStatus = (feedbackId: string, status: FeedbackStatus) => {
    setFeedbacks(prev =>
      prev.map(f => (f.id === feedbackId ? { ...f, status } : f))
    );
  };

  const toggleFeedbackFeatured = (feedbackId: string) => {
    setFeedbacks(prev =>
      prev.map(f => (f.id === feedbackId ? { ...f, isFeatured: !f.isFeatured } : f))
    );
  };

  const resetToDefaultData = () => {
    localStorage.removeItem('sv_queries');
    localStorage.removeItem('sv_organizations');
    localStorage.removeItem('sv_feedbacks');
    localStorage.removeItem('sv_feedbacks_version');
    setQueries(INITIAL_QUERIES);
    setOrganizations(INITIAL_ORGANIZATIONS);
    setFeedbacks(INITIAL_FEEDBACKS);
  };

  return (
    <AppDataContext.Provider
      value={{
        queries,
        addQuery,
        assignQueryToOrg,
        updateQueryStatus,
        updateQueryNotes,
        organizations,
        addOrganization,
        updateOrganizationStatus,
        updateOrganization,
        feedbacks,
        addFeedback,
        updateFeedbackStatus,
        toggleFeedbackFeatured,
        services,
        blogs,
        resetToDefaultData
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

