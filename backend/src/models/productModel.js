class Product {
    constructor(id, name, description, gender, image, price, category, subcategory, createdAt, updatedAt, colors) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gender = gender;
        this.image = image;
        this.price = price;
        this.category = category;
        this.subcategory = subcategory;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.colors = colors;
    }
}

export default Product;