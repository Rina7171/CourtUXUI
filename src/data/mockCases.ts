export type Classification = 'Criminal' | 'Civil';
export type CaseStatus = 'Open' | 'Pending' | 'Closed' | 'Appealed';

export interface Party {
  name: string;
  khmerName?: string;
  role: 'Plaintiff' | 'Defendant';
}

export interface RelatedHearing {
  id: string;
  type: string;
  dateTime: string;
  courtroom: string;
}

export interface CourtCase {
  id: string;
  caseNumber: string;
  title: string;
  classification: Classification;
  status: CaseStatus;
  filedDate: string;
  court: string;
  judge: string;
  description: string;
  parties: Party[];
  hearings: RelatedHearing[];
}

export const mockCases: CourtCase[] = [
{
  id: '1',
  caseNumber: '2024/PP/0123',
  title: 'Sok Dara v. Chea Vanna',
  classification: 'Civil',
  status: 'Open',
  filedDate: '2024-03-14',
  court: 'Phnom Penh Municipal Court',
  judge: 'H.E. Chhim Sophea',
  description:
  'Civil dispute concerning a contractual disagreement over a property lease agreement within Daun Penh district. The plaintiff seeks restitution of deposit funds and damages.',
  parties: [
  { name: 'Sok Dara', khmerName: 'សុខ ដារា', role: 'Plaintiff' },
  { name: 'Chea Vanna', khmerName: 'ជា វណ្ណា', role: 'Defendant' }],

  hearings: [
  {
    id: 'h1',
    type: 'Trial',
    dateTime: '2024-06-18T09:30:00',
    courtroom: 'Courtroom 3'
  },
  {
    id: 'h2',
    type: 'Bail Hearing',
    dateTime: '2024-04-22T14:00:00',
    courtroom: 'Courtroom 1'
  }]

},
{
  id: '2',
  caseNumber: '2024/PP/0241',
  title: 'Public Prosecutor v. Meas Sokhom',
  classification: 'Criminal',
  status: 'Pending',
  filedDate: '2024-02-02',
  court: 'Phnom Penh Municipal Court',
  judge: 'H.E. Nuon Sokhan',
  description:
  'Criminal proceedings relating to alleged fraud and misappropriation of public funds. Currently pending review of submitted evidence by the prosecution.',
  parties: [
  {
    name: 'Public Prosecutor',
    khmerName: 'ព្រះរាជអាជ្ញា',
    role: 'Plaintiff'
  },
  { name: 'Meas Sokhom', khmerName: 'មាស សុខុម', role: 'Defendant' }],

  hearings: [
  {
    id: 'h3',
    type: 'Arraignment',
    dateTime: '2024-03-10T10:00:00',
    courtroom: 'Courtroom 2'
  }]

},
{
  id: '3',
  caseNumber: '2023/PP/0987',
  title: 'Khun Bopha v. Ny Ratha',
  classification: 'Civil',
  status: 'Closed',
  filedDate: '2023-09-21',
  court: 'Phnom Penh Municipal Court',
  judge: 'H.E. Pich Channary',
  description:
  'Civil matter regarding division of family assets following inheritance. Case concluded with a settlement approved by the court.',
  parties: [
  { name: 'Khun Bopha', khmerName: 'ឃុន បុប្ផា', role: 'Plaintiff' },
  { name: 'Ny Ratha', khmerName: 'នី រដ្ឋា', role: 'Defendant' }],

  hearings: [
  {
    id: 'h4',
    type: 'Trial',
    dateTime: '2023-11-05T09:00:00',
    courtroom: 'Courtroom 4'
  }]

},
{
  id: '4',
  caseNumber: '2023/PP/0654',
  title: 'Public Prosecutor v. Sam Pisey',
  classification: 'Criminal',
  status: 'Appealed',
  filedDate: '2023-07-12',
  court: 'Court of Appeal, Phnom Penh',
  judge: 'H.E. Long Kimchhorn',
  description:
  'Criminal appeal filed against the sentencing judgment of the first instance court. The matter is now before the Court of Appeal for review.',
  parties: [
  {
    name: 'Public Prosecutor',
    khmerName: 'ព្រះរាជអាជ្ញា',
    role: 'Plaintiff'
  },
  { name: 'Sam Pisey', khmerName: 'សំ ពិសី', role: 'Defendant' }],

  hearings: [
  {
    id: 'h5',
    type: 'Sentencing',
    dateTime: '2024-05-30T13:30:00',
    courtroom: 'Appeal Hall A'
  }]

},
{
  id: '5',
  caseNumber: '2024/PP/0312',
  title: 'Tep Vichea v. Phnom Penh Authority',
  classification: 'Civil',
  status: 'Open',
  filedDate: '2024-04-01',
  court: 'Phnom Penh Municipal Court',
  judge: 'H.E. Chhim Sophea',
  description:
  'Administrative civil claim regarding municipal land acquisition compensation in Sen Sok district.',
  parties: [
  { name: 'Tep Vichea', khmerName: 'ទេព វិជ្ជា', role: 'Plaintiff' },
  {
    name: 'Phnom Penh Authority',
    khmerName: 'អាជ្ញាធរភ្នំពេញ',
    role: 'Defendant'
  }],

  hearings: [
  {
    id: 'h6',
    type: 'Trial',
    dateTime: '2024-07-02T09:30:00',
    courtroom: 'Courtroom 3'
  }]

},
{
  id: '6',
  caseNumber: '2024/PP/0078',
  title: 'Public Prosecutor v. Heng Sovann',
  classification: 'Criminal',
  status: 'Pending',
  filedDate: '2024-01-19',
  court: 'Phnom Penh Municipal Court',
  judge: 'H.E. Nuon Sokhan',
  description:
  'Criminal proceedings concerning alleged traffic-related offences resulting in injury. Awaiting forensic report.',
  parties: [
  {
    name: 'Public Prosecutor',
    khmerName: 'ព្រះរាជអាជ្ញា',
    role: 'Plaintiff'
  },
  { name: 'Heng Sovann', khmerName: 'ហេង សុវណ្ណ', role: 'Defendant' }],

  hearings: [
  {
    id: 'h7',
    type: 'Arraignment',
    dateTime: '2024-02-28T10:30:00',
    courtroom: 'Courtroom 2'
  }]

},
{
  id: '7',
  caseNumber: '2023/PP/0445',
  title: 'Chan Sreypov v. Lim Daravuth',
  classification: 'Civil',
  status: 'Closed',
  filedDate: '2023-05-30',
  court: 'Phnom Penh Municipal Court',
  judge: 'H.E. Pich Channary',
  description:
  'Civil dispute concerning a commercial debt repayment agreement. Concluded by judgment for the plaintiff.',
  parties: [
  { name: 'Chan Sreypov', khmerName: 'ចាន់ ស្រីពៅ', role: 'Plaintiff' },
  { name: 'Lim Daravuth', khmerName: 'លឹម ដារាវុធ', role: 'Defendant' }],

  hearings: [
  {
    id: 'h8',
    type: 'Trial',
    dateTime: '2023-08-14T14:00:00',
    courtroom: 'Courtroom 1'
  }]

},
{
  id: '8',
  caseNumber: '2024/PP/0399',
  title: 'Public Prosecutor v. Ouk Sambath',
  classification: 'Criminal',
  status: 'Open',
  filedDate: '2024-05-08',
  court: 'Phnom Penh Municipal Court',
  judge: 'H.E. Long Kimchhorn',
  description:
  'Criminal proceedings relating to alleged theft of property. Investigation phase ongoing.',
  parties: [
  {
    name: 'Public Prosecutor',
    khmerName: 'ព្រះរាជអាជ្ញា',
    role: 'Plaintiff'
  },
  { name: 'Ouk Sambath', khmerName: 'អ៊ុក សម្បត្តិ', role: 'Defendant' }],

  hearings: [
  {
    id: 'h9',
    type: 'Bail Hearing',
    dateTime: '2024-05-20T11:00:00',
    courtroom: 'Courtroom 4'
  }]

}];