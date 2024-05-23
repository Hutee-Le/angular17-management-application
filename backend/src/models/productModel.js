class Product {
    constructor(id, name, description, gender, image, price, category, subcategory, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gender = gender;
        this.image = image;
        this.colors = [];
        this.price = price;
        this.category = category;
        this.subcategory = subcategory;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Product;