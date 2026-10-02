import React from "react";

interface Category {
    id: number;
    name: string;
    image: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", width: "220px", background: "#fff" }}>
            <img 
                src={product.images[0]} 
                alt={product.title} 
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
                onError={(e) => {
                    // Agar rasm yuklanmasa, zaxira rasm qo'yish
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                }}
            />
            <h4 style={{ fontSize: "14px", margin: "10px 0 5px 0" }}>{product.title}</h4>
            <p style={{ color: "green", fontWeight: "bold", margin: "0 0 8px 0" }}>${product.price}</p>
            <span style={{ fontSize: "11px", background: "#f0f0f0", padding: "3px 6px", borderRadius: "4px" }}>
                {product.category.name}
            </span>
        </div>
    );
};