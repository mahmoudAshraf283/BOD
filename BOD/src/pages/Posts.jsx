import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/apiService';
import { useApiCall } from '../hooks/useApiCall';

const Posts = ({ showNotification }) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [postDialog, setPostDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [postForm, setPostForm] = useState({
        title: '',
        body: '',
        userId: null
    });

    const { loading, executeMultipleApiCalls } = useApiCall();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [postsData, usersData] = await executeMultipleApiCalls([
                apiService.getPosts(),
                apiService.getUsers()
            ]);
            
            setPosts(postsData);
            setUsers(usersData);
            showNotification('success', 'Success', 'Posts loaded successfully');
        } catch (error) {
            console.error('Error fetching posts:', error);
            showNotification('error', 'Error', 'Failed to load posts');
        }
    };

    const openNew = () => {
        setPostForm({
            title: '',
            body: '',
            userId: null
        });
        setIsEditing(false);
        setPostDialog(true);
    };

    const editPost = (post) => {
        setPostForm({ ...post });
        setIsEditing(true);
        setPostDialog(true);
    };

    const hideDialog = () => {
        setPostDialog(false);
    };

    const savePost = () => {
        if (isEditing) {
            const updatedPosts = posts.map(post => 
                post.id === postForm.id ? postForm : post
            );
            setPosts(updatedPosts);
            showNotification('success', 'Success', 'Post updated successfully');
        } else {
            const newPost = {
                ...postForm,
                id: posts.length + 1
            };
            setPosts([...posts, newPost]);
            showNotification('success', 'Success', 'Post created successfully');
        }
        setPostDialog(false);
    };

    const deletePost = (post) => {
        const updatedPosts = posts.filter(p => p.id !== post.id);
        setPosts(updatedPosts);
        showNotification('success', 'Success', 'Post deleted successfully');
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Unknown';
    };

    const userBodyTemplate = (rowData) => {
        return getUserName(rowData.userId);
    };

    const titleBodyTemplate = (rowData) => {
        return (
            <div style={{ maxWidth: '200px' }}>
                <div className="font-bold">{rowData.title}</div>
                <div className="text-500 text-sm mt-1">{rowData.body.substring(0, 50)}...</div>
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-success p-button-text" 
                    onClick={() => editPost(rowData)} 
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-warning p-button-text" 
                    onClick={() => deletePost(rowData)} 
                />
            </div>
        );
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <h2 className="m-0">Manage Posts</h2>
            <div className="flex gap-2">
                <span className="p-input-icon-left">
                    <InputText 
                        value={globalFilter} 
                        onChange={(e) => setGlobalFilter(e.target.value)} 
                        placeholder="Search posts..." 
                    />
                </span>
                <Button 
                    label="New Post" 
                    icon="pi pi-plus" 
                    onClick={openNew}
                    style={{ color: '#000000' }}
                />
            </div>
        </div>
    );

    if (loading) {
        return <LoadingSpinner message="Loading posts..." />;
    }

    return (
        <div className="p-4">
            <Card>
                <DataTable 
                    value={posts} 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    header={header}
                    globalFilter={globalFilter}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    selection={selectedPost}
                    onSelectionChange={(e) => setSelectedPost(e.value)}
                >
                    <Column field="id" header="ID" sortable style={{ width: '10%' }} />
                    <Column body={titleBodyTemplate} header="Title & Content" style={{ width: '40%' }} />
                    <Column body={userBodyTemplate} header="Author" sortable style={{ width: '20%' }} />
                    <Column field="userId" header="User ID" sortable style={{ width: '15%' }} />
                    <Column body={actionBodyTemplate} header="Actions" style={{ width: '15%' }} />
                </DataTable>
            </Card>

            <Dialog 
                visible={postDialog} 
                style={{ width: '500px' }} 
                header={isEditing ? "Edit Post" : "New Post"} 
                modal 
                onHide={hideDialog}
                closable={false}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={{ color: '#000000', '--icon-color': '#000000' }} />
                        <Button label="Save" icon="pi pi-check" onClick={savePost} style={{ color: '#000000' }} />
                    </div>
                }
            >
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <InputText 
                        id="title" 
                        value={postForm.title} 
                        onChange={(e) => setPostForm({...postForm, title: e.target.value})} 
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="body">Content</label>
                    <InputTextarea 
                        id="body" 
                        value={postForm.body} 
                        onChange={(e) => setPostForm({...postForm, body: e.target.value})} 
                        rows={5}
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="userId">Author</label>
                    <Dropdown 
                        id="userId"
                        value={postForm.userId} 
                        options={users.map(user => ({ label: user.name, value: user.id }))}
                        onChange={(e) => setPostForm({...postForm, userId: e.value})} 
                        placeholder="Select an author"
                        className="w-full"
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default Posts;
