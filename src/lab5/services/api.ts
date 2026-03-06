// src/services/api.js
import axios from 'axios';
const API_COUNTRIES = 'http://localhost:5000/api/countries';
const API_USERS = 'http://localhost:5000/api/users';

// ========== COUNTRIES ==========
export const getCountries = async () => {
    try {
        const response = await axios.get(API_COUNTRIES);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los países:', error);
        throw error;
    }
};
export const getCountry = async (id : string) => {
    try {
        const response = await axios.get(`${API_COUNTRIES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el país:', error);
        throw error;
    }
};
export const createCountry = async (country : { name: string; capital: string; currency: string }) => {
    try {
        const response = await axios.post(API_COUNTRIES, country);
        return response.data;
    } catch (error) {
        console.error('Error al crear el país:', error);
        throw error;
    }
};
export const updateCountry = async (id : string, country : { name: string; capital: string; currency: string }) => {
    try {
        const response = await axios.put(`${API_COUNTRIES}/${id}`, country);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el país:', error);
        throw error;
    }
};
export const deleteCountry = async (id : string) => {
    try {
        const response = await axios.delete(`${API_COUNTRIES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el país:', error);
        throw error;
    }
};

// ========== USERS ==========
export const getUsers = async () => {
    try {
        const response = await axios.get(API_USERS);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};

export const getUser = async (id : string) => {
    try {
        const response = await axios.get(`${API_USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};

export const createUser = async (user : { email: string; password: string; nombre: string }) => {
    try {
        const response = await axios.post(API_USERS, user);
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

export const updateUser = async (id : string, user : any) => {
    try {
        const response = await axios.put(`${API_USERS}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};

export const deleteUser = async (id : string) => {
    try {
        const response = await axios.delete(`${API_USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};