import type { IssueData } from '../../types/AuthRequest.js';
interface CreateIssuePayload {
    title: string;
    description: string;
    type: string;
    reporter_id: number;
}
interface UpdateIssuePayload {
    title?: string;
    description?: string;
    type?: string;
    status?: string;
}
interface ReporterData {
    id: number;
    name: string;
    role: string;
}
interface IssueWithReporter extends Omit<IssueData, 'reporter_id'> {
    reporter: ReporterData | null;
}
export declare const createIssueService: (data: CreateIssuePayload) => Promise<IssueData>;
export declare const getIssuesService: (queryFilters: Record<string, string>) => Promise<IssueWithReporter[]>;
export declare const getIssueByIdService: (id: string) => Promise<IssueWithReporter | null>;
export declare const getRawIssueByIdService: (id: string) => Promise<IssueData | null>;
export declare const updateIssueService: (id: string, data: UpdateIssuePayload) => Promise<IssueData>;
export declare const deleteIssueService: (id: string) => Promise<boolean>;
export {};
//# sourceMappingURL=issues.service.d.ts.map