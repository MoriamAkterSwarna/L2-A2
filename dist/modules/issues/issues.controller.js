import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse.js';
import { createIssueService, getIssuesService, getIssueByIdService, getRawIssueByIdService, updateIssueService, deleteIssueService, } from './issues.service.js';
export const createIssue = async (req, res, next) => {
    try {
        const { title, description, type } = req.body;
        const reporter_id = req.user?.id;
        if (!title || !description || !type) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Title, description, and type are required',
            });
        }
        if (title.length > 150) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Title must be at most 150 characters',
            });
        }
        if (description.length < 20) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Description must be at least 20 characters',
            });
        }
        if (!['bug', 'feature_request'].includes(type)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Type must be either bug or feature_request',
            });
        }
        const newIssue = await createIssueService({ title, description, type, reporter_id: reporter_id });
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'Issue created successfully',
            data: newIssue,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getIssues = async (req, res, next) => {
    try {
        const issues = await getIssuesService(req.query);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Issues retrived successfully',
            data: issues,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getIssueById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const issue = await getIssueByIdService(id);
        if (!issue) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Issue not found',
            });
        }
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Issue retrived successfully',
            data: issue,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateIssue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, type, status } = req.body;
        const user = req.user;
        const issue = await getRawIssueByIdService(id);
        if (!issue) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Issue not found',
            });
        }
        if (user.role === 'contributor') {
            if (issue.reporter_id !== user.id) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    success: false,
                    message: 'You can only update your own issues',
                });
            }
            if (issue.status !== 'open') {
                return res.status(StatusCodes.CONFLICT).json({
                    success: false,
                    message: 'You can only update issues with "open" status',
                });
            }
        }
        const updateData = {};
        if (title !== undefined) {
            if (title.length > 150) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: 'Title must be at most 150 characters',
                });
            }
            updateData.title = title;
        }
        if (description !== undefined) {
            if (description.length < 20) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: 'Description must be at least 20 characters',
                });
            }
            updateData.description = description;
        }
        if (type !== undefined) {
            if (!['bug', 'feature_request'].includes(type)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: 'Type must be either bug or feature_request',
                });
            }
            updateData.type = type;
        }
        if (status !== undefined) {
            if (user.role === 'contributor') {
                return res.status(StatusCodes.FORBIDDEN).json({
                    success: false,
                    message: 'Only maintainers can update issue status',
                });
            }
            if (!['open', 'in_progress', 'resolved'].includes(status)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: 'Status must be one of: open, in_progress, resolved',
                });
            }
            updateData.status = status;
        }
        const updatedIssue = await updateIssueService(id, updateData);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Issue updated successfully',
            data: updatedIssue,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteIssue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await deleteIssueService(id);
        if (!deleted) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Issue not found',
            });
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Issue deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=issues.controller.js.map