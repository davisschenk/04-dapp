import logo from "./logo.svg";
import "./App.css";
import { loadProductReviewContract, loadProductContract } from "./contracts.js";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import  DropdownSelector from './DropdownSelector';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [reviewContract, setReviewContract] = useState(null);
  const [productContract, setProductContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [product, setProduct] = useState(null);
  const [productIndex, setProductIndex] = useState(null);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    loadBlockchain();
  }, []);

  useEffect(() => {
    if (reviewContract) {
      loadReviews();
    }
  }, [reviewContract, productIndex]);

  useEffect(() => {
    if (productContract) {
      loadProducts();
    }
  }, [productContract]);

  const loadBlockchain = async () => {
    const web3i = new Web3(Web3.givenProvider || "http://localhost:7545");
    setWeb3(web3i);

    const accounts = await web3i.eth.getAccounts();
    setAccount(accounts[0]);
    setAccounts(accounts)

    const networkId = await web3i.eth.net.getId();
    console.log(networkId);

    const rinstance = await loadProductReviewContract(web3i);
    setReviewContract(rinstance);

    const instance = await loadProductContract(web3i);
    setProductContract(instance);
  };

  const addReview = async (event) => {
    event.preventDefault();
    await reviewContract.methods.addReview(productIndex, content).send({from: account, gas: 150000});
    setReviews([...reviews, {content: content, reviewer: account}]);
    setContent("");
  };

  const loadReviews = async () => {
    if (!reviewContract) return;
    if (!productIndex) return;

    const reviews = await reviewContract.methods.getReviews(productIndex).call();
    setReviews(reviews);
  };

  const addProduct = async (event) => {
    event.preventDefault();
    await productContract.methods.addProduct(content).send({ from: account });
    setProducts([...products, { name: content, owner: account }])
    setContent("")
  };

  const loadProducts = async () => {
    if (!reviewContract) return;

    const products = await productContract.methods.getProducts().call();
    setProducts(products);
  };

  const setPI = (i) => {
    setProduct(products[i]);
    setProductIndex(i)
  }


  return (
  <Tabs>
    <TabList>
      <Tab>Product Management</Tab>
      <Tab>View a product</Tab>
    </TabList>
    <h2>Select an Account</h2>
    Account: <DropdownSelector options={accounts} onSelect={(i) => setAccount(accounts[i])}/>
    Current Account: {account}
    <TabPanel>
      <h2>Product Management</h2>
      <form onSubmit={addProduct}>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
        <button type="submit">Create Product</button>
      </form>
      <h3>Products</h3>
      <ul>
        {products.map((product, index) => (<li key={index}>{product.name} by {product.owner}</li>))}
      </ul>
    </TabPanel>
    <TabPanel>
      <h2>Product Viewer</h2>
      Select a product: <DropdownSelector options={products} onSelect={setPI} render={(i) => i.name}/>
      Selected product: {product ? product.name: "None selected"}

      <form onSubmit={addReview}>
        Review Text: <input type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
        <button type="submit">Create Review</button>
      </form>
      <ul>
        {reviews.map((review, index) => (<li key={index}>            <p>Reviewer: {review.reviewer}</p>
            <p>Content: {review.content}</p></li>))}
      </ul>
    </TabPanel>
  </Tabs>
  );
}

export default App;
