import React from "react";
import {
    Row,
    Col,
} from "antd";

const SageProductDetails = (props) => {

    const { product } = props

    return (
        product ?
            <>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>Category</label>
                        <div>
                            {product.Category}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>Division</label>
                        <div>
                            {product.Division}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>FilfillType</label>
                        <div>
                            {product.FilfillType}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>Freight</label>
                        <div>
                            {product.Freight}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ImageLink</label>
                        <div>
                            {product.ImageLink}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ItemCode</label>
                        <div>
                            {product.ItemCode}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ItemDescription</label>
                        <div>
                            {product.ItemDescription}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ItemID</label>
                        <div>
                            {product.ItemID}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ItemStatus</label>
                        <div>
                            {product.ItemStatus}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ItemTitle</label>
                        <div>
                            {product.ItemTitle}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ItemType</label>
                        <div>
                            {product.ItemType}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>MetaDescription</label>
                        <div>
                            {product.MetaDescription}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>MetaKeywords</label>
                        <div>
                            {product.MetaKeywords}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>OnSale</label>
                        <div>
                            {product.OnSale}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>PriceCode</label>
                        <div>
                            {product.PriceCode}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>ProcureType</label>
                        <div>
                            {product.ProcureType}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>QuantityOnHand</label>
                        <div>
                            {product.QuantityOnHand}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>QuantityStatus</label>
                        <div>
                            {product.QuantityStatus}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>TaxClass</label>
                        <div>
                            {product.TaxClass}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>UDF1</label>
                        <div>
                            {product.UDF1}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>UDF2</label>
                        <div>
                            {product.UDF2}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>UDF3</label>
                        <div>
                            {product.UDF3}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>Unit</label>
                        <div>
                            {product.Unit}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>UnitCost</label>
                        <div>
                            {product.UnitCost}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>UnitListPrice</label>
                        <div>
                            {product.UnitListPrice}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>UnitPrice</label>
                        <div>
                            {product.UnitPrice}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>UnitSalePrice</label>
                        <div>
                            {product.UnitSalePrice}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>VendorAccount</label>
                        <div>
                            {product.VendorAccount}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>Volume</label>
                        <div>
                            {product.Volume}
                        </div>
                    </Col>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>Warehouse</label>
                        <div>
                            {product.Warehouse}
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="sageCol" xs={24} sm={10}>
                        <label>Weight</label>
                        <div>
                            {product.Weight}
                        </div>
                    </Col>
                </Row>
            </>
            :
            <h3>Failed To Fetch Product!</h3>
    )
}

export { SageProductDetails }