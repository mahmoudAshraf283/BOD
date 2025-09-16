import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/apiService';
import { useApiCall } from '../hooks/useApiCall';

const Users = () => {
    const { showSuccess, showError } = useNotification();
    const [users, setUsers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        company: { name: '' }
    });

    const { loading, executeApiCall } = useApiCall();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await executeApiCall(
                () => apiService.getUsers()
            );
            setUsers(data);
            showSuccess('Success', 'Users loaded successfully');
        } catch (error) {
            console.error('Error fetching users:', error);
            showError('Error', 'Failed to load users');
        }
    };

    const openNew = () => {
        setUserForm({
            name: '',
            email: '',
            phone: '',
            website: '',
            company: { name: '' }
        });
        setIsEditing(false);
        setUserDialog(true);
    };

    const editUser = (user) => {
        setUserForm({ ...user });
        setIsEditing(true);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setUserDialog(false);
    };

    const saveUser = () => {
        if (isEditing) {
            const updatedUsers = users.map(user => 
                user.id === userForm.id ? userForm : user
            );
            setUsers(updatedUsers);
            showSuccess('Success', 'User updated successfully');
        } else {
            const newUser = {
                ...userForm,
                id: users.length + 1
            };
            setUsers([...users, newUser]);
            showSuccess('Success', 'User created successfully');
        }
        setUserDialog(false);
    };

    const deleteUser = (user) => {
        const updatedUsers = users.filter(u => u.id !== user.id);
        setUsers(updatedUsers);
        showSuccess('Success', 'User deleted successfully');
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-outlined p-button-sm" 
                    severity="info"
                    onClick={() => editUser(rowData)}
                    tooltip="Edit user"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-outlined p-button-sm" 
                    severity="danger"
                    onClick={() => deleteUser(rowData)}
                    tooltip="Delete user"
                    tooltipOptions={{ position: 'top' }}
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row gap-3 md:justify-content-between md:align-items-center">
            <h2 className="m-0">Manage Users</h2>
            <div className="flex flex-column sm:flex-row gap-2">
                <InputText 
                    value={globalFilter} 
                    onChange={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Search users..." 
                    className="w-full sm:w-20rem"
                />
                <Button 
                    label="New User" 
                    icon="pi pi-plus" 
                    onClick={openNew}
                    className="w-full sm:w-auto"
                    style={{ color: '#000000' }}
                />
            </div>
        </div>
    );

    if (loading) {
        return <LoadingSpinner message="Loading users..." />;
    }

    return (
        <div className="p-2 md:p-4">
            <Card>
                <DataTable 
                    value={users} 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    header={header}
                    globalFilter={globalFilter}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    selection={selectedUser}
                    onSelectionChange={(e) => setSelectedUser(e.value)}
                >
                    <Column field="id" header="ID" sortable style={{ width: '10%' }} />
                    <Column field="name" header="Name" sortable style={{ width: '20%' }} />
                    <Column field="email" header="Email" sortable style={{ width: '25%' }} />
                    <Column field="phone" header="Phone" sortable style={{ width: '20%' }} />
                    <Column field="company.name" header="Company" sortable style={{ width: '20%' }} />
                    <Column body={actionBodyTemplate} header="Actions" style={{ width: '15%' }} />
                </DataTable>
            </Card>

            <Dialog 
                visible={userDialog} 
                style={{ width: '90vw', maxWidth: '450px' }} 
                header={isEditing ? "Edit User" : "New User"} 
                modal 
                onHide={hideDialog}
                closable={false}
                draggable={false}
                resizable={false}
                footer={
                    <div className="flex justify-content-end gap-2">
                        <Button 
                            label="Cancel" 
                            icon="pi pi-times" 
                            className="p-button-outlined" 
                            onClick={hideDialog}
                            style={{ color: '#000000', '--icon-color': '#000000' }}
                        />
                        <Button 
                            label="Save" 
                            icon="pi pi-check" 
                            onClick={saveUser}
                            style={{ color: '#000000' }}
                        />
                    </div>
                }
            >
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText 
                        id="name" 
                        value={userForm.name} 
                        onChange={(e) => setUserForm({...userForm, name: e.target.value})} 
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText 
                        id="email" 
                        value={userForm.email} 
                        onChange={(e) => setUserForm({...userForm, email: e.target.value})} 
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <InputText 
                        id="phone" 
                        value={userForm.phone} 
                        onChange={(e) => setUserForm({...userForm, phone: e.target.value})} 
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="website">Website</label>
                    <InputText 
                        id="website" 
                        value={userForm.website} 
                        onChange={(e) => setUserForm({...userForm, website: e.target.value})} 
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="company">Company</label>
                    <InputText 
                        id="company" 
                        value={userForm.company?.name || ''} 
                        onChange={(e) => setUserForm({...userForm, company: { name: e.target.value }})} 
                        className="w-full"
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default Users;
