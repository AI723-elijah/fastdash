import React, { useState, useEffect } from 'react';
import './Styles/List.scss';

import { Button,Input  } from 'antd';

const BulkAssociation = ({ option,
    parentProducts,
    childProducts,
    getProductsByOption,
    optionProducts,
    ResetSelectedOptionProducts,
    close,
    loading,
    save
}) => {

    const [tabs, setTabs] = useState([
        { id: 1, name: 'Parent', active: true },
        { id: 2, name: 'Child', active: false }
    ])
    const [parent, setParent] = useState([]);
    const [child, setChild] = useState([]);
    const [linkedProducts, setLinkedProducts] = useState();
    const [searchValue, setSearchValue] = useState('')
    const [parentCopy, setParentCopy] = useState([]);
    const [childCopy, setChildCopy] = useState([]);
    const [searchWarrning, setSearchWarrning] = useState(false)

    useEffect(() => {
        if (parentProducts.length > 0 && optionProducts) {
            setParentProduct();
        }
        // eslint-disable-next-line
    }, [optionProducts, parentProducts])

    useEffect(() => {
        return () => {
            ResetSelectedOptionProducts()
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (childProducts.length > 0 && optionProducts) {
            setChildProducts();
        }
        // eslint-disable-next-line
    }, [childProducts, optionProducts])

    useEffect(() => {
        getProductsByOption(option.productID);
        // eslint-disable-next-line
    }, [])

    const setParentProduct = (linked) => {
        if (linked) {
            let filteredProducts = []
            parentProducts.map(prd => 
                !linked.includes(prd.productID) &&
                    filteredProducts.push(prd)
            )
            filteredProducts.map(p => 
                p.checked = false
            )
            setParent([...filteredProducts]);
            setParentCopy([...filteredProducts])
        } else {
            let filteredProducts = []
            parentProducts.map(prd => !linkedProducts.includes(prd.productID) &&
                    filteredProducts.push(prd)
            )
            filteredProducts.map(p => 
                p.checked = false
            )
            setParent([...filteredProducts]);
            setParentCopy([...filteredProducts]);
        }
    }

    const setChildProducts = (linked) => {
        if (linked) {
            let filteredProducts = []
            childProducts.map(prd => !linked.includes(prd.productID) && 
                    filteredProducts.push(prd)
            )
            filteredProducts.map(p => 
                p.checked = false
            )
            setChild([...filteredProducts])
            setChildCopy([...filteredProducts]);
        } else {
            let filteredProducts = []
            childProducts.map(prd => !linkedProducts.includes(prd.productID) &&
                    filteredProducts.push(prd)
            )
            filteredProducts.map(p => 
                p.checked = false
            )
            setChild([...filteredProducts])
            setChildCopy([...filteredProducts]);
        }
    }

    useEffect(() => {
        if (optionProducts) {
            const liknedProducts = optionProducts.map(o => o.productID);
            setLinkedProducts([...liknedProducts])
            setChildProducts([...liknedProducts]);
            setParentProduct([...liknedProducts]);
        }
        // eslint-disable-next-line
    }, [optionProducts])

    const tabClickHandler = (tab) => {
        setSearchValue('')
        setSearchWarrning(false)
        setParent([...parentCopy])
        setChild([...childCopy])
        const updatedTabs = tabs.map(t => {
            if (t.id === tab.id) {
                t.active = true
            }
            else {
                t.active = false
            }
            return t
        });

        setTabs(updatedTabs)
    }
    const parentChangeHandler = (prod) => {
        const updatedParent = parent.map(prd => {
            if (prd.productID === prod.productID) {
                prd.checked = !prd.checked
            };
            return prd
        })
        setParent(updatedParent)
    }

    const childChangeHandler = (prod) => {
        const updatedChild = child.map(prd => {
            if (prd.productID === prod.productID) {
                prd.checked = !prd.checked
            };
            return prd
        })
        setChild(updatedChild)
    }
    const searchChangeHanlder = (event) => {
        setSearchValue(event.target.value);
        if (event.target.value !== '') {
            if (tabs[0].active) {
                const parents = parentCopy.filter(prd => prd.name.toLowerCase().includes(event.target.value.toLowerCase()));
                if (parents.length === 0) {
                    setSearchWarrning(true)
                }
                setParent([...parents])
            }
            if (tabs[1].active) {
                const childs = childCopy.filter(prd => prd.name.toLowerCase().includes(event.target.value.toLowerCase()));
                if (childs.length === 0) {
                    setSearchWarrning(true)
                }
                setChild([...childs])
            }
        } else {
            setParent([...parentCopy])
            setChild([...childCopy])
        }

    }
    return (
        <>
            <div className="d-flex-row justify-between tabs">
                <div className="d-flex-row">
                    {tabs.map((t) => (
                        <div key={t.id}
                            onClick={() => { tabClickHandler(t) }}
                            className={t.active ? 'tab tab-active' : 'tab'}>
                            {t.name}
                        </div>
                    ))}
                </div>
                <div>
                    <Input   type="text"
                        onChange={(e) => { searchChangeHanlder(e) }}
                        value={searchValue}
                        placeholder="Search" />
                </div>
            </div>
            <div style={{ maxHeight: '500px', overflowY: 'scroll', marginTop: '15px' }}>
                {tabs[0].active ? parent.length > 0 ?
                    <>
                        {parent.map((prd) => {
                            return (
                                <>
                                    <div key={prd.productID} className="list-item">
                                        <input
                                            onChange={() => { parentChangeHandler(prd) }}

                                            type="checkbox"
                                            checked={prd.checked}
                                        ></input>
                                        {prd.name}
                                    </div>
                                </>
                            )
                        })}
                    </>
                    : <>
                        {!searchWarrning ?
                            <div className="loading">
                                Loading Products ...
                 </div> :
                            <div className="loading">
                                No Product found
              </div>

                        }
                    </> : ''
                }
                {tabs[1].active ? child.length > 0 ?
                    <>
                        {child.map((prd) => {
                            return (
                                <>
                                    <div key={prd.productID} className="list-item">
                                        <input
                                            type="checkbox"
                                            checked={prd.checked}
                                            onChange={() => { childChangeHandler(prd) }}
                                        ></input>
                                        {prd.name}
                                    </div>
                                </>
                            )
                        })}
                    </>
                    : <>
                        {!searchWarrning ?
                            <div className="loading">
                                Loading Products ...
                 </div> :
                            <div className="loading">
                                No Product found
              </div>

                        }
                    </> : ''
                }
            </div>
            <div style={{ textAlign: 'right', padding: "25px 15px 0px 0px" }}>
                <Button loading={loading} key='close' onClick={() => { close() }}>
                    Close
        </Button>,
            <Button loading={loading} onClick={() => { save([...parent, ...child], option.productID) }} form='imForm' key='submit' htmlType='submit'>
                    Submit
        </Button>
            </div>
        </>
    )
}

export { BulkAssociation };