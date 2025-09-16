import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/apiService';
import { useApiCall } from '../hooks/useApiCall';

const Albums = () => {
    const { showSuccess, showError } = useNotification();
    const [albums, setAlbums] = useState([]);
    const [users, setUsers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albumDialog, setAlbumDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [albumForm, setAlbumForm] = useState({
        title: '',
        userId: null
    });

    const { loading, executeMultipleApiCalls } = useApiCall();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [albumsData, usersData] = await executeMultipleApiCalls([
                apiService.getAlbums(),
                apiService.getUsers()
            ]);
            
            setAlbums(albumsData);
            setUsers(usersData);
            showSuccess('Success', 'Albums loaded successfully');
        } catch (error) {
            console.error('Error fetching albums:', error);
            showError('Error', 'Failed to load albums');
        }
    };

    const openNew = () => {
        setAlbumForm({
            title: '',
            userId: null
        });
        setIsEditing(false);
        setAlbumDialog(true);
    };

    const editAlbum = (album) => {
        setAlbumForm({ ...album });
        setIsEditing(true);
        setAlbumDialog(true);
    };

    const hideDialog = () => {
        setAlbumDialog(false);
    };

    const saveAlbum = () => {
        if (isEditing) {
            const updatedAlbums = albums.map(album => 
                album.id === albumForm.id ? albumForm : album
            );
            setAlbums(updatedAlbums);
            showSuccess('Success', 'Album updated successfully');
        } else {
            const newAlbum = {
                ...albumForm,
                id: albums.length + 1
            };
            setAlbums([...albums, newAlbum]);
            showSuccess('Success', 'Album created successfully');
        }
        setAlbumDialog(false);
    };

    const deleteAlbum = (album) => {
        const updatedAlbums = albums.filter(a => a.id !== album.id);
        setAlbums(updatedAlbums);
        showSuccess('Success', 'Album deleted successfully');
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Unknown';
    };

    const userBodyTemplate = (rowData) => {
        return getUserName(rowData.userId);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-success p-button-text" 
                    onClick={() => editAlbum(rowData)} 
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-warning p-button-text" 
                    onClick={() => deleteAlbum(rowData)} 
                />
            </div>
        );
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <h2 className="m-0">Manage Albums</h2>
            <div className="flex gap-2">
                <span className="p-input-icon-left">
                    <InputText 
                        value={globalFilter} 
                        onChange={(e) => setGlobalFilter(e.target.value)} 
                        placeholder="Search albums..." 
                    />
                </span>
                <Button 
                    label="New Album" 
                    icon="pi pi-plus" 
                    onClick={openNew}
                    style={{ color: '#000000' }}
                />
            </div>
        </div>
    );

    if (loading) {
        return <LoadingSpinner message="Loading albums..." />;
    }

    return (
        <div className="p-4">
            <Card>
                <DataTable 
                    value={albums} 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    header={header}
                    globalFilter={globalFilter}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    selection={selectedAlbum}
                    onSelectionChange={(e) => setSelectedAlbum(e.value)}
                >
                    <Column field="id" header="ID" sortable style={{ width: '10%' }} />
                    <Column field="title" header="Title" sortable style={{ width: '50%' }} />
                    <Column body={userBodyTemplate} header="Owner" sortable style={{ width: '25%' }} />
                    <Column body={actionBodyTemplate} header="Actions" style={{ width: '15%' }} />
                </DataTable>
            </Card>

            <Dialog 
                visible={albumDialog} 
                style={{ width: '450px' }} 
                header={isEditing ? "Edit Album" : "New Album"} 
                modal 
                onHide={hideDialog}
                closable={false}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={{ color: '#000000', '--icon-color': '#000000' }} />
                        <Button label="Save" icon="pi pi-check" onClick={saveAlbum} style={{ color: '#000000' }} />
                    </div>
                }
            >
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <InputText 
                        id="title" 
                        value={albumForm.title} 
                        onChange={(e) => setAlbumForm({...albumForm, title: e.target.value})} 
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="userId">Owner</label>
                    <Dropdown 
                        id="userId"
                        value={albumForm.userId} 
                        options={users.map(user => ({ label: user.name, value: user.id }))}
                        onChange={(e) => setAlbumForm({...albumForm, userId: e.value})} 
                        placeholder="Select an owner"
                        className="w-full"
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default Albums;
