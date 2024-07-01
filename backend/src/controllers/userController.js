import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import firebase from "../../databases/firebase";
import User from '../models/User'

const db = getFirestore(firebase);

export const createUser = async (req, res, next) => {
    const { id, name, mobNumber, age, email, password, gender, uploadPhoto, role, activated, address } = req.body;

    const newUser = new User(id, name, mobNumber, age, email, password, gender, uploadPhoto, role, activated, address);
    try {
        const userRef = await addDoc(collection(db, 'users'),{
            name: newUser.name,
            mobNumber: newUser.mobNumber,
            age: newUser.age,
            email: newUser.email,
            password: newUser.password,
            gender: newUser.gender,
            uploadPhoto: newUser.uploadPhoto,
            role: newUser.role,
            activated: newUser.activated,
            address: {
                street: newUser.address.street,
                city: newUser.address.city,
                state: newUser.address.state,
            }
        });

        res.status(201).json({ message: 'User created successfully', userId: userRef.id });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        
        usersSnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching users', error: error.message });
    }
};