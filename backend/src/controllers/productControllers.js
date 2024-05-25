import firebase from "../../databases/firebase";
import Product from "../models/productModel";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

export const createProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const productId = 6;
        console.log(data)
        const productRef = doc(collection(db, 'products'), productId.toString());
        await setDoc(productRef, { id: productId.toString(), ...data });
        res.status(200).send('product created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await getDocs(collection(db, 'products'));
        const productArray = [];

        if (products.empty) {
            res.status(400).send('No Products found');
        } else {
            products.forEach((doc) => {
                const product = new Product(
                    doc.id,
                    doc.data().name,
                    doc.data().description,
                    doc.data().gender,
                    doc.data().image,
                    doc.data().price,
                    doc.data().category,
                    doc.data().subcategory,
                );
                productArray.push(product);
            });

            res.status(200).send(productArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = doc(db, 'products', id);
        const data = await getDoc(product);
        if (data.exists()) {
            res.status(200).send(data.data());
        } else {
            res.status(404).send('product not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = doc(db, 'products', id);
        await updateDoc(product, data);
        res.status(200).send('product updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, 'products', id));
        res.status(200).send('product deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};