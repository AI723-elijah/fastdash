import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { List, Skeleton, Avatar, Checkbox, Typography } from "antd";
import { imageURL } from "../../Common/createImageURL";

const { Item } = List;
const { Meta } = Item;
const { Title } = Typography;

const ProductList = ({
  loading,
  products,
  handleAdd,
  handleSelectList,
  selected,
  pathname,
}) => {
  return (
    <List
      className="m-15"
      loading={loading}
      itemLayout="horizontal"
      dataSource={products}
      renderItem={(item) => {
        const e = item && item.images && item.images[0];
        let src = "";
        if (e && e.productImageID) {
          src =
            e && e.image && e.image.indexOf("http") > -1
              ? e.image
              : imageURL(e.image);
        } else {
          src = e ? e.image : "";
        }

        return (
          <Item
            actions={[
              <EditOutlined
                onClick={() => handleAdd(`${pathname}/edit/${item.productID}`)}
              />,
            ]}
          >
            <Checkbox
              className="p-10"
              checked={selected.indexOf(item.productID) > -1}
              onChange={(e) => handleSelectList(e, item.productID)}
            />
            <Skeleton avatar title={false} loading={loading} active>
              <Meta
                avatar={<Avatar size={64} shape="square" src={src} />}
                title={`[${item.sku}] ${item.name}`}
                description={item.description}
              />
              <Title level={4}>
                {(item.price || item.price === 0) &&
                  `$${parseFloat(item.price).toFixed(2)}`}
              </Title>
              <span style={{ marginLeft: "15px" }}>{item.status}</span>
            </Skeleton>
          </Item>
        );
      }}
    />
  );
};

export { ProductList };
