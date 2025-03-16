import React, { useState } from 'react';
import './addicecream.scss';
import axios from 'axios';
const AddIcecream = () => {
    const [product, setProduct] = useState({
        images: []
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProduct = { ...product };

        if (name === 'keyword') {
            updatedProduct.keyword[index].title = value;
        } else {
            updatedProduct[name] = value;
        }

        setProduct(updatedProduct);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Process selected image files
        const imageArray = files.map((file) => ({
            data: URL.createObjectURL(file),
            contentType: file.type,
        }));

        setProduct({
            ...product,
            images: [...product.images, ...imageArray],
        });
    };

    const deleteImage = (index) => {
        const updatedImages = [...product.images];
        updatedImages.splice(index, 1);
        setProduct({
            ...product,
            images: updatedImages,
        });
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        // Process dropped image files
        const imageArray = files.map((file) => ({
            data: URL.createObjectURL(file),
            contentType: file.type,
        }));

        setProduct({
            ...product,
            images: [...product.images, ...imageArray],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted product:', product);
    };

    const addKeywordField = () => {
        setProduct({
            ...product,
            keyword: [...product.keyword, { title: '' }],
        });
    };

    const removeKeywordField = (index) => {
        const updatedKeywords = [...product.keyword];
        updatedKeywords.splice(index, 1);

        setProduct({
            ...product,
            keyword: updatedKeywords,
        });
    };
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [imageee, setImage] = useState('');
    const handleImg = (e) => {
        setImage(e.target.files[0]);
    };
    var like = 0;
    async function AddProduct() {
        const keyword = {
            title: title
        }
        const image = imageee;
        const item = { name, price, quantity, type, keyword, like, image }
        console.log(item);

        // return;
        // let result = await fetch(`${process.env.REACT_APP_BASE_URL}/icecream/cice`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //         // Authorization: Token,
        //     },
        //     body: JSON.stringify(item)
        // })
        let result = await axios.post(`${process.env.REACT_APP_BASE_URL}/icecream/cice`, item, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            console.log(res);
        })
        console.log(result);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="addIcecream">
                {/* <div className='allitem'> */}
                <div className='allitem'>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        // value={product.name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='allitem'>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        // value={product.price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className='allitem'
                    onDrop={handleImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                    style={{
                        border: '2px dashed #ccc',
                        padding: '20px',
                        cursor: 'pointer',
                    }}
                >
                    <label
                        htmlFor="imageInput"
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            padding: '20px',
                            border: '2px dashed #ccc',
                            cursor: 'pointer',
                        }}
                    >
                        {product.images.length > 0 ? (
                            <div className="image-preview">
                                {product.images.map((image, index) => (
                                    <div key={index} className="image-upload">
                                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                        <img
                                            src={image.data}
                                            alt={`Image ${index}`}
                                            style={{
                                                maxWidth: '100px',
                                                margin: '5px',
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteImage(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            'Click or Drag & Drop Images Here'
                        )}
                    </label>
                    {/* <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        multiple // Allow multiple files to be selected
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    /> */}
                    <input
                        type='file'
                        name='file'
                        onChange={handleImg}
                    />
                </div>
                <div className='allitem'>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        // value={product.quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className='allitem'>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        // value={product.type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>
                <div className='allitem'>
                    <label>Keywords:</label>
                    <input
                        type="text"
                        name="title"
                        // value={product.type}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {/* {product.keyword.map((keyword, index) => (
                        <div key={index} className="keyword">
                            <input
                                type="text"
                                name="keyword"
                                value={keyword.title}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                            <button
                                type="button"
                                onClick={() => removeKeywordField(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))} */}
                    <button type="button" onClick={addKeywordField}>
                        Add Keyword
                    </button>
                </div>
                <div className='allitem'>
                    {/* <label>Like:</label>
                    <input
                        type="number"
                        name="like"
                        value={product.like}
                        onChange={handleInputChange}
                    /> */}
                </div>
                <div className='allitem'>
                    <button type="submit" onClick={AddProduct}>Submit</button>
                </div>
            </div>
        </form>
    );
};

export default AddIcecream;