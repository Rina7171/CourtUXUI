import { mockCases } from './mockCases';

export interface Greffier {
  id: string;
  name: string;
  khmerName: string;
  role: 'Greffier' | 'Chief Greffier';
  email: string;
  assignedCases: number;
  active: boolean;
}

export interface Judge {
  id: string;
  name: string;
  khmerName: string;
  barNumber: string;
  active: boolean;
  assignedCaseIds: string[];
}

export interface Lawyer {
  id: string;
  name: string;
  khmerName: string;
  barNumber: string;
  firm: string;
  assignedCaseIds: string[];
}

export interface Participant {
  id: string;
  name: string;
  khmerName: string;
  partyType: 'Individual' | 'Group';
  phone: string;
  email: string;
  caseIds: string[];
}

export type DocumentType =
'Filing' |
'Motion' |
'Continuance' |
'Evidence' |
'Disposition' |
'Appeal';

export interface CourtDocument {
  id: string;
  caseId: string;
  type: DocumentType;
  title: string;
  submittedBy: string;
  confidential: boolean;
  uploadedDate: string;
}

export type ActivityType =
'Case Filed' |
'Hearing Scheduled' |
'Status Changed' |
'Document Added' |
'Disposition Entered';

export interface DocketEntry {
  id: string;
  caseId: string;
  activityType: ActivityType;
  description: string;
  performedBy: string;
  timestamp: string;
}

export type Outcome =
'Guilty' |
'Dismissed' |
'Settled' |
'Liable' |
'Not Liable';

export interface Disposition {
  id: string;
  caseId: string;
  outcome: Outcome;
  judge: string;
  ruling: string;
  effectiveDate: string;
}

export const currentUser = {
  name: 'Kim Sophal',
  khmerName: 'គឹម សុផល',
  role: 'Chief Greffier' as const,
  email: 'sophal.kim@court.gov.kh'
};

export const greffiers: Greffier[] = [
{
  id: 'g1',
  name: 'Kim Sophal',
  khmerName: 'គឹម សុផល',
  role: 'Chief Greffier',
  email: 'sophal.kim@court.gov.kh',
  assignedCases: 12,
  active: true
},
{
  id: 'g2',
  name: 'Yim Channary',
  khmerName: 'យិម ចន្ទារ៉ា',
  role: 'Greffier',
  email: 'channary.yim@court.gov.kh',
  assignedCases: 8,
  active: true
},
{
  id: 'g3',
  name: 'Seng Vibol',
  khmerName: 'សេង វិបុល',
  role: 'Greffier',
  email: 'vibol.seng@court.gov.kh',
  assignedCases: 6,
  active: true
},
{
  id: 'g4',
  name: 'Mao Sokunthea',
  khmerName: 'ម៉ៅ សុគន្ធា',
  role: 'Greffier',
  email: 'sokunthea.mao@court.gov.kh',
  assignedCases: 5,
  active: false
}];


export const judges: Judge[] = [
{
  id: 'j1',
  name: 'H.E. Chhim Sophea',
  khmerName: 'ឯកឧត្តម ឈឹម សុភា',
  barNumber: 'JDG-1024',
  active: true,
  assignedCaseIds: ['1', '5']
},
{
  id: 'j2',
  name: 'H.E. Nuon Sokhan',
  khmerName: 'ឯកឧត្តម នួន សុខន',
  barNumber: 'JDG-1041',
  active: true,
  assignedCaseIds: ['2', '6']
},
{
  id: 'j3',
  name: 'H.E. Pich Channary',
  khmerName: 'ឯកឧត្តម ពេជ្រ ចន្ទារ៉ា',
  barNumber: 'JDG-1058',
  active: true,
  assignedCaseIds: ['3', '7']
},
{
  id: 'j4',
  name: 'H.E. Long Kimchhorn',
  khmerName: 'ឯកឧត្តម ឡុង គឹមឆន',
  barNumber: 'JDG-1067',
  active: false,
  assignedCaseIds: ['4', '8']
}];


export const lawyers: Lawyer[] = [
{
  id: 'l1',
  name: 'Chea Sothea',
  khmerName: 'ជា សុធា',
  barNumber: 'BAR-2201',
  firm: 'Sothea & Associates',
  assignedCaseIds: ['1', '3']
},
{
  id: 'l2',
  name: 'Vann Rithy',
  khmerName: 'វ៉ាន់ រិទ្ធី',
  barNumber: 'BAR-2245',
  firm: 'Mekong Legal Group',
  assignedCaseIds: ['2']
},
{
  id: 'l3',
  name: 'Sok Mealea',
  khmerName: 'សុខ មាលា',
  barNumber: 'BAR-2289',
  firm: 'Angkor Law Firm',
  assignedCaseIds: ['5', '7']
}];


export const participants: Participant[] = [
{
  id: 'p1',
  name: 'Sok Dara',
  khmerName: 'សុខ ដារា',
  partyType: 'Individual',
  phone: '+855 12 345 678',
  email: 'sok.dara@email.kh',
  caseIds: ['1']
},
{
  id: 'p2',
  name: 'Chea Vanna',
  khmerName: 'ជា វណ្ណា',
  partyType: 'Individual',
  phone: '+855 12 987 654',
  email: 'chea.vanna@email.kh',
  caseIds: ['1']
},
{
  id: 'p3',
  name: 'Meas Sokhom',
  khmerName: 'មាស សុខុម',
  partyType: 'Individual',
  phone: '+855 17 222 333',
  email: 'meas.sokhom@email.kh',
  caseIds: ['2']
},
{
  id: 'p4',
  name: 'Phnom Penh Authority',
  khmerName: 'អាជ្ញាធរភ្នំពេញ',
  partyType: 'Group',
  phone: '+855 23 100 200',
  email: 'contact@ppauthority.gov.kh',
  caseIds: ['5']
},
{
  id: 'p5',
  name: 'Khun Bopha',
  khmerName: 'ឃុន បុប្ផា',
  partyType: 'Individual',
  phone: '+855 96 555 444',
  email: 'khun.bopha@email.kh',
  caseIds: ['3']
}];


export const courtDocuments: CourtDocument[] = [
{
  id: 'd1',
  caseId: '1',
  type: 'Filing',
  title: 'Statement of Claim',
  submittedBy: 'Chea Sothea',
  confidential: false,
  uploadedDate: '2024-03-14'
},
{
  id: 'd2',
  caseId: '1',
  type: 'Motion',
  title: 'Motion for Interim Relief',
  submittedBy: 'Chea Sothea',
  confidential: false,
  uploadedDate: '2024-04-02'
},
{
  id: 'd3',
  caseId: '1',
  type: 'Evidence',
  title: 'Lease Agreement (Exhibit A)',
  submittedBy: 'Yim Channary',
  confidential: true,
  uploadedDate: '2024-04-10'
},
{
  id: 'd4',
  caseId: '2',
  type: 'Filing',
  title: 'Indictment',
  submittedBy: 'Public Prosecutor',
  confidential: false,
  uploadedDate: '2024-02-02'
},
{
  id: 'd5',
  caseId: '2',
  type: 'Evidence',
  title: 'Financial Records (Exhibit 1)',
  submittedBy: 'Seng Vibol',
  confidential: true,
  uploadedDate: '2024-02-20'
},
{
  id: 'd6',
  caseId: '4',
  type: 'Appeal',
  title: 'Notice of Appeal',
  submittedBy: 'Vann Rithy',
  confidential: false,
  uploadedDate: '2023-12-01'
}];


export const docketEntries: DocketEntry[] = [
{
  id: 'dk1',
  caseId: '1',
  activityType: 'Case Filed',
  description: 'Case opened and registered in the court registry.',
  performedBy: 'Kim Sophal',
  timestamp: '2024-03-14T08:30:00'
},
{
  id: 'dk2',
  caseId: '1',
  activityType: 'Document Added',
  description: 'Statement of Claim filed by plaintiff counsel.',
  performedBy: 'Yim Channary',
  timestamp: '2024-03-14T09:15:00'
},
{
  id: 'dk3',
  caseId: '1',
  activityType: 'Hearing Scheduled',
  description: 'Bail Hearing scheduled in Courtroom 1.',
  performedBy: 'Yim Channary',
  timestamp: '2024-04-01T11:00:00'
},
{
  id: 'dk4',
  caseId: '1',
  activityType: 'Status Changed',
  description: 'Case status updated to Open.',
  performedBy: 'Kim Sophal',
  timestamp: '2024-04-05T14:20:00'
},
{
  id: 'dk5',
  caseId: '2',
  activityType: 'Case Filed',
  description: 'Criminal case registered.',
  performedBy: 'Seng Vibol',
  timestamp: '2024-02-02T10:00:00'
},
{
  id: 'dk6',
  caseId: '4',
  activityType: 'Disposition Entered',
  description: 'First-instance judgment recorded; appeal subsequently filed.',
  performedBy: 'Kim Sophal',
  timestamp: '2023-11-30T16:00:00'
}];


export const dispositions: Disposition[] = [
{
  id: 'dp1',
  caseId: '3',
  outcome: 'Settled',
  judge: 'H.E. Pich Channary',
  ruling:
  'Parties reached a court-approved settlement regarding division of family assets.',
  effectiveDate: '2023-11-05'
},
{
  id: 'dp2',
  caseId: '7',
  outcome: 'Liable',
  judge: 'H.E. Pich Channary',
  ruling: 'Judgment entered for the plaintiff on the commercial debt claim.',
  effectiveDate: '2023-08-14'
}];


export const recentActivity: DocketEntry[] = [...docketEntries].
sort((a, b) => a.timestamp < b.timestamp ? 1 : -1).
slice(0, 5);

export const dashboardStats = {
  assignedCases: mockCases.length,
  upcomingHearings: 4,
  pendingDispositions: 2
};