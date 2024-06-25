import firebase from "../../databases/firebase";
import Color from "../models/colorModel";
import Product from "../models/productModel";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import Size from "../models/sizeModel";

const db = getFirestore(firebase);

export const createProduct = async (req, res, next) => {
    const data = req.body;

    try {
        const productRef = await addDoc(collection(db, 'products'), {
            name: data.name,
            description: data.description,
            gender: data.gender,
            image: data.image,
            price: data.price,
            category: data.category,
            subcategory: data.subcategory,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const colors = Array.isArray(data.colors) ? data.colors : [];

        const colorRefs = [];
        for (const color of colors) {
            const colorRef = await addDoc(collection(db, 'colors'), { 
                name: color.name 
            });

            const sizes = Array.isArray(color.sizes) ? color.sizes : [];
            const sizeRefs = [];
            for (const size of sizes) {
                const sizeRef = await addDoc(collection(db, 'sizes'), { 
                    size_name: size.size_name, 
                    quantity: size.quantity 
                });
                sizeRefs.push(sizeRef);
            }

            await setDoc(colorRef, { sizes: sizeRefs }, { merge: true });
            colorRefs.push(colorRef);
        }

        await setDoc(productRef, { colors: colorRefs }, { merge: true });

        res.status(201).send({ id: productRef.id });
    } catch (error) {
        console.error("Error creating product: ", error);
        res.status(500).send(error.message);
    }
}

export const getProducts = async (req, res, next) => {
    const productsCol = collection(db, 'products');

    try {
        const productSnapshot = await getDocs(productsCol);

        const productList = [];

        for (const doc of productSnapshot.docs) {
            const data = doc.data();

            const product = new Product(
                doc.id,
                data.name,
                data.description,
                data.gender,
                data.image,
                data.price,
                data.category,
                data.subcategory,
                data.createdAt,
                data.updatedAt,
                []
            );

            if (data.colors) {
                for (const colorRef of data.colors) {
                    try {
                        const colorDoc = await getDoc(colorRef);
                        
                        if (colorDoc.exists()) {
                            const colorData = colorDoc.data();

                            const color = new Color(
                                colorDoc.id,
                                colorData.name,
                                []
                            );

                            if (colorData.sizes) {
                                for (const sizeRef of colorData.sizes) {
                                    try {
                                        const sizeDoc = await getDoc(sizeRef); 
                                        
                                        if (sizeDoc.exists()) {
                                            const sizeData = sizeDoc.data();
                                            const size = new Size(
                                                sizeDoc.id,
                                                sizeData.size_name,
                                                sizeData.quantity
                                            );
                                            color.sizes.push(size);
                                        } else {
                                            console.log(`Size document ${sizeRef.sizeRef} not found.`);
                                        }
                                    } catch (error) {
                                        console.error(`Error fetching size document: ${error}`);
                                    }
                                }
                            }

                            product.colors.push(color);
                        } else {
                            console.log(`Color document ${colorRef.id} not found.`);
                        }
                    } catch (error) {
                        console.error(`Error fetching color document: ${error}`);
                    }
                }
            }

            productList.push(product);
        }

        res.status(200).send(productList);

    } catch (error) {
        console.error("Error getting products: ", error);
        res.status(400).send(error.message);
    }
}

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
    const { id } = req.params;

    try {
        const productRef = doc(db, 'products', id);
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
            res.status(404).send('Product not found');
            return;
        }

        const productData = productDoc.data();

        if (productData.colors) {
            for (const colorRef of productData.colors) {
                const colorDoc = await getDoc(colorRef);

                if (colorDoc.exists()) {
                    const colorData = colorDoc.data();

                    if (colorData.sizes) {
                        for (const sizeRef of colorData.sizes) {
                            await deleteDoc(sizeRef);
                        }
                    }

                    await deleteDoc(colorRef);
                }
            }
        }

        await deleteDoc(productRef);

        res.status(200).send('Product deleted successfully');
    } catch (error) {
        console.error("Error deleting product: ", error);
        res.status(500).send(error.message);
    }
}