import { mockCases } from './mockCases';

export type HearingType =
'Arraignment' |
'Trial' |
'Bail Hearing' |
'Sentencing';
export type HearingStatus = 'Scheduled' | 'Completed' | 'Adjourned';

export interface Hearing {
  id: string;
  caseId: string;
  caseNumber: string;
  type: HearingType;
  date: string;
  startTime: string;
  endTime: string;
  courtroom: string;
  status: HearingStatus;
}

export const mockHearings: Hearing[] = [
{
  id: 'h1',
  caseId: '1',
  caseNumber: '2024/PP/0123',
  type: 'Trial',
  date: '2024-06-18',
  startTime: '09:30',
  endTime: '11:00',
  courtroom: 'Courtroom 3',
  status: 'Scheduled'
},
{
  id: 'h2',
  caseId: '1',
  caseNumber: '2024/PP/0123',
  type: 'Bail Hearing',
  date: '2024-04-22',
  startTime: '14:00',
  endTime: '15:00',
  courtroom: 'Courtroom 1',
  status: 'Completed'
},
{
  id: 'h3',
  caseId: '2',
  caseNumber: '2024/PP/0241',
  type: 'Arraignment',
  date: '2024-03-10',
  startTime: '10:00',
  endTime: '10:45',
  courtroom: 'Courtroom 2',
  status: 'Completed'
},
{
  id: 'h4',
  caseId: '3',
  caseNumber: '2023/PP/0987',
  type: 'Trial',
  date: '2023-11-05',
  startTime: '09:00',
  endTime: '12:00',
  courtroom: 'Courtroom 4',
  status: 'Completed'
},
{
  id: 'h5',
  caseId: '4',
  caseNumber: '2023/PP/0654',
  type: 'Sentencing',
  date: '2024-05-30',
  startTime: '13:30',
  endTime: '14:30',
  courtroom: 'Appeal Hall A',
  status: 'Scheduled'
},
{
  id: 'h6',
  caseId: '5',
  caseNumber: '2024/PP/0312',
  type: 'Trial',
  date: '2024-07-02',
  startTime: '09:30',
  endTime: '11:30',
  courtroom: 'Courtroom 3',
  status: 'Scheduled'
},
{
  id: 'h7',
  caseId: '6',
  caseNumber: '2024/PP/0078',
  type: 'Arraignment',
  date: '2024-02-28',
  startTime: '10:30',
  endTime: '11:15',
  courtroom: 'Courtroom 2',
  status: 'Adjourned'
},
{
  id: 'h8',
  caseId: '7',
  caseNumber: '2023/PP/0445',
  type: 'Trial',
  date: '2023-08-14',
  startTime: '14:00',
  endTime: '16:00',
  courtroom: 'Courtroom 1',
  status: 'Completed'
},
{
  id: 'h9',
  caseId: '8',
  caseNumber: '2024/PP/0399',
  type: 'Bail Hearing',
  date: '2024-05-20',
  startTime: '11:00',
  endTime: '11:45',
  courtroom: 'Courtroom 4',
  status: 'Scheduled'
}];


export function getCaseForHearing(hearingId: string) {
  const hearing = mockHearings.find((h) => h.id === hearingId);
  if (!hearing) return undefined;
  return mockCases.find((c) => c.id === hearing.caseId);
}