import React, { useEffect, useState } from "react";
import {
  Spin,
  //  Space,
  Table,
  Card,
} from "antd";

const NonMappedProductsToSage = (props) => {
  const [nonMappedProducts, setNonMappedProducts] = useState([]);

  const fetchProducts = async () => {
    props.startLoading();
    if (!props.inventoryItems) {
      await props.getInventoryItems();
    }
    if (props.allSkus && props.allSkus.length === 0) {
      await props.getAllProductsInSystem();
    }
    props.stopLoading();
  };

  const columns = [
    {
      title: "UPC",
      dataIndex: "upc",
      key: "UPC",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Dimensions",
      dataIndex: "dimensions",
      key: "dimensions",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => <Space size="middle"></Space>,
    // },
  ];

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let { inventoryItems, allSkus } = props;
    if (
      nonMappedProducts &&
      nonMappedProducts.length === 0 &&
      inventoryItems &&
      inventoryItems.length > 0 &&
      allSkus &&
      allSkus.length > 0
    ) {
      setNonMappedProducts(
        allSkus &&
          allSkus.filter(
            (p) =>
              !(
                inventoryItems &&
                inventoryItems.some(
                  (item) =>
                    item.ItemCode === p.sku || item.ItemCode === p.ItemCode
                )
              )
          )
      );
    }
  });
  return (
    <Spin spinning={props.loading}>
      <Card
        title="Non Mapped Products to Sage"
        className="width-100 products-list"
      >
        {console.log(nonMappedProducts)}
        <Table
          columns={columns}
          pagination={{ position: "bottom" }}
          dataSource={nonMappedProducts}
        />
      </Card>
    </Spin>
  );
};

export { NonMappedProductsToSage };
