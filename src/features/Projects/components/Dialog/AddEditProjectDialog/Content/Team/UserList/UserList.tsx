import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import { EUserList, IUser } from 'src/features/Projects/redux/project.types';
import { SelectedUserListHeader } from './SelectedUserListHeader';
import { UnSelectedUserListHeader } from './UnSelectedUserListHeader';
import { UserItem } from './UserItem';
interface Props {
    type: EUserList,
    userList: IUser[]
}
function UserList({ type, userList }: Props) {
    const [isChecked, setIsChecked] = useState(true);
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    return (
        <div>
            {type === EUserList.SelectedUserList ? (
                <SelectedUserListHeader
                    isChecked={isChecked}
                    handleChangeCheckBox={handleChange}
                />
            ) : (
                <UnSelectedUserListHeader handleClick={handleClick} open={open} />

            )}
            <Collapse in={open} timeout="auto" unmountOnExit>
                {userList.map((user, index) => (
                    <UserItem
                        type={type}
                        user={user}
                        key={index}
                        isShowDeActiveMember={isChecked}
                    />
                ))}
            </Collapse>
        </div>
    );
}

export default UserList;