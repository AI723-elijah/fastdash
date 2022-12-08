import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Row, Col } from "antd";
import debounce from 'lodash/debounce';
import { imageURL } from "../../../../Common/createImageURL";

// const accessory = {
// 	childID: ''
// };

class Accessories extends Component {
	constructor() {
    super();

    this.state = {
      modalOpen: false,
			loading: false,
			products: [],
			selectedAccessory: ''
    }

    this.handleSearch = debounce(this.handleSearch, 800);
  }

	handleSearch = async (e) => {
		this.setState({ loading: true });
		const res = await this.props.searchVariations(e);
		this.setState({ loading: false, products: res.payload.rows });
	}

	handleSelect = (e, i) => {
		const { match, handleStateChange } = this.props;
		if (match.params && match.params.id) {
			const f = this.state.products.find(ev => ev.productID === e);
			let productAccessories = [...this.props.productAccessories];
			productAccessories[i].parentID = parseInt(match.params.id);
			productAccessories[i].childID = e;
			productAccessories[i] = {
				...productAccessories[i],
				accessoryDetails: {
					sku: f.sku
				}
			}
			handleStateChange(productAccessories, "productAccessories");
		}
	}

	handleDelete = (i) => {
		this.setState({ modalOpen: true, selectedAccessory: i });
	};

	deleteAccessory = async () => {
		const { selectedAccessory } = this.state;
		const {
			productAccessories,
			handleStateChange,
			deleteAccessory
		} = this.props;
		
		await this.setState({ modalOpen: false });
		const updated = [...productAccessories].filter((acc, i) => i !== selectedAccessory);
		handleStateChange(updated, "productAccessories");
		if (productAccessories[selectedAccessory].id !== '') {
			this.setState({ loading: true });
			deleteAccessory(productAccessories[selectedAccessory].id);
			this.setState({ loading: false });
		}
	}
getImageUrl=(images=[])=>{
 let image= images[0]&&images[0].image
return	imageURL(image)
}
	render() {
		const {
			// productAccessories=[],
			productRelations,
		} = this.props;
		const accessories=productRelations.map(r=>r.childProductDetails.productAccessories).flat()

		return (
			<>
				<Row className="my-10" gutter={16}>
					{accessories.map((a, i) => {
						return (
							<Col key={i} xs={24}>
								<Card
								hoverable
								className="m10"
								>
							    <div className='d-flex align-items-center'>									
								<img height='90px' alt='product' src={this.getImageUrl(a.accessoryDetails&&a.accessoryDetails.images)}></img>	
								<h2>{a&&a.accessoryDetails&&a.accessoryDetails.name}</h2>
								</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			</>
		);
	}
}

let AccessoriesTab = Form.create()(Accessories);
export { AccessoriesTab };
