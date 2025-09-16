import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Tag } from 'primereact/tag';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/apiService';
import { useApiCall } from '../hooks/useApiCall';

const Todos = ({ showNotification }) => {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [todoDialog, setTodoDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [todoForm, setTodoForm] = useState({
        title: '',
        completed: false,
        userId: null
    });

    const { loading, executeMultipleApiCalls } = useApiCall();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [todosData, usersData] = await executeMultipleApiCalls([
                apiService.getTodos(),
                apiService.getUsers()
            ]);
            
            setTodos(todosData);
            setUsers(usersData);
            showNotification('success', 'Success', 'Todos loaded successfully');
        } catch (error) {
            console.error('Error fetching todos:', error);
            showNotification('error', 'Error', 'Failed to load todos');
        }
    };

    const openNew = () => {
        setTodoForm({
            title: '',
            completed: false,
            userId: null
        });
        setIsEditing(false);
        setTodoDialog(true);
    };

    const editTodo = (todo) => {
        setTodoForm({ ...todo });
        setIsEditing(true);
        setTodoDialog(true);
    };

    const hideDialog = () => {
        setTodoDialog(false);
    };

    const saveTodo = () => {
        if (isEditing) {
            const updatedTodos = todos.map(todo => 
                todo.id === todoForm.id ? todoForm : todo
            );
            setTodos(updatedTodos);
            showNotification('success', 'Success', 'Todo updated successfully');
        } else {
            const newTodo = {
                ...todoForm,
                id: todos.length + 1
            };
            setTodos([...todos, newTodo]);
            showNotification('success', 'Success', 'Todo created successfully');
        }
        setTodoDialog(false);
    };

    const deleteTodo = (todo) => {
        const updatedTodos = todos.filter(t => t.id !== todo.id);
        setTodos(updatedTodos);
        showNotification('success', 'Success', 'Todo deleted successfully');
    };

    const toggleComplete = (todo) => {
        const updatedTodos = todos.map(t => 
            t.id === todo.id ? { ...t, completed: !t.completed } : t
        );
        setTodos(updatedTodos);
        showNotification('info', 'Info', `Todo marked as ${!todo.completed ? 'completed' : 'incomplete'}`);
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Unknown';
    };

    const userBodyTemplate = (rowData) => {
        return getUserName(rowData.userId);
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <Tag 
                value={rowData.completed ? 'Completed' : 'Pending'} 
                severity={rowData.completed ? 'success' : 'warning'}
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon={rowData.completed ? "pi pi-times" : "pi pi-check"} 
                    className={`p-button-rounded p-button-text ${rowData.completed ? 'p-button-warning' : 'p-button-success'}`}
                    onClick={() => toggleComplete(rowData)}
                    tooltip={rowData.completed ? 'Mark as incomplete' : 'Mark as complete'}
                />
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-info p-button-text" 
                    onClick={() => editTodo(rowData)} 
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger p-button-text" 
                    onClick={() => deleteTodo(rowData)} 
                />
            </div>
        );
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <h2 className="m-0">Manage Todos</h2>
            <div className="flex gap-2">
                <span className="p-input-icon-left">
                    <InputText 
                        value={globalFilter} 
                        onChange={(e) => setGlobalFilter(e.target.value)} 
                        placeholder="Search todos..." 
                    />
                </span>
                <Button 
                    label="New Todo" 
                    icon="pi pi-plus" 
                    onClick={openNew}
                    style={{ color: '#000000' }}
                />
            </div>
        </div>
    );

    if (loading) {
        return <LoadingSpinner message="Loading todos..." />;
    }

    return (
        <div className="p-4">
            <Card>
                <DataTable 
                    value={todos} 
                    paginator 
                    rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    header={header}
                    globalFilter={globalFilter}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    selection={selectedTodo}
                    onSelectionChange={(e) => setSelectedTodo(e.value)}
                >
                    <Column field="id" header="ID" sortable style={{ width: '10%' }} />
                    <Column field="title" header="Title" sortable style={{ width: '40%' }} />
                    <Column body={userBodyTemplate} header="Assigned To" sortable style={{ width: '20%' }} />
                    <Column body={statusBodyTemplate} header="Status" sortable style={{ width: '15%' }} />
                    <Column body={actionBodyTemplate} header="Actions" style={{ width: '15%' }} />
                </DataTable>
            </Card>

            <Dialog 
                visible={todoDialog} 
                style={{ width: '450px' }} 
                header={isEditing ? "Edit Todo" : "New Todo"} 
                modal 
                onHide={hideDialog}
                closable={false}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={{ color: '#000000', '--icon-color': '#000000' }} />
                        <Button label="Save" icon="pi pi-check" onClick={saveTodo} style={{ color: '#000000' }} />
                    </div>
                }
            >
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <InputText 
                        id="title" 
                        value={todoForm.title} 
                        onChange={(e) => setTodoForm({...todoForm, title: e.target.value})} 
                        className="w-full"
                    />
                </div>
                <div className="field">
                    <label htmlFor="userId">Assigned To</label>
                    <Dropdown 
                        id="userId"
                        value={todoForm.userId} 
                        options={users.map(user => ({ label: user.name, value: user.id }))}
                        onChange={(e) => setTodoForm({...todoForm, userId: e.value})} 
                        placeholder="Select a user"
                        className="w-full"
                    />
                </div>
                <div className="field-checkbox">
                    <Checkbox 
                        inputId="completed" 
                        checked={todoForm.completed} 
                        onChange={(e) => setTodoForm({...todoForm, completed: e.checked})} 
                    />
                    <label htmlFor="completed" className="ml-2">Completed</label>
                </div>
            </Dialog>
        </div>
    );
};

export default Todos;
