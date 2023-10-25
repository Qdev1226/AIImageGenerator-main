import RoleModel from '../../models/RoleModel.js';

export const ROLE_IDX_FREE = 0;
export const ROLE_IDX_19 = 1;
export const ROLE_IDX_29 = 2;

export const getAllRoles = async (req, res) => {
    try {
        const roles = await RoleModel.find().sort({ role_idx: 1 }).exec();
        res.status(200).json({ roles: roles });
    } catch (err) {
        res.status(500).json({ err });
    }
}

export const changeUserRole = async (req, res) => {
    const userId = req.userId;
    const roleId = req.body._id;
    const roleIdx = req.body.index;
    try {

    } catch (err) {

    }
}