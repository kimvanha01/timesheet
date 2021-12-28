import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EUserList } from 'src/features/Projects/redux/project.types';
import { getAllUser } from 'src/features/Projects/redux/projectThunk';
import { EBranchUser, ELevelUser, ETypeUser } from 'src/features/Projects/redux/user.types';
import { RootState } from 'src/store/store';
import UserList from './UserList/UserList';
interface Props {
    isEditMode?: boolean
}
function TeamTab({ isEditMode }: Props) {
    const filterUnSelectedUserList = useSelector((state: RootState) => state.projects.filterListUserUnSelected);
    const listUser = useSelector((state: RootState) => state.projects.listUser).filter(
        (user) =>
            (user.branch === filterUnSelectedUserList.branch || filterUnSelectedUserList.branch === EBranchUser.All) &&
            (user.type === filterUnSelectedUserList.type || filterUnSelectedUserList.type === ETypeUser.All) &&
            (user.level === filterUnSelectedUserList.level || filterUnSelectedUserList.level === ELevelUser.All) &&
            user.fullName.includes(filterUnSelectedUserList.search)
    );
    const selectedUserList = useSelector((state: RootState) => state.projects.selectedUserList);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isEditMode) {
            dispatch(getAllUser())
        }
    }, [dispatch, isEditMode])
    return (
        <>
            <UserList type={EUserList.SelectedUserList} userList={selectedUserList} />
            <UserList type={EUserList.UnSelectedUserList} userList={listUser} />
        </>
    );
}

export default TeamTab;