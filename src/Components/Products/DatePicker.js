import React from 'react';
import { DatePicker } from 'antd';

const PickDate = (props) => {
const { handleChangeStartDate, handleChangeEndDate } = props;

	return(
		<div className='d-flex-row'>
			<DatePicker
				className='width-100 mx-5'
				onChange={handleChangeStartDate}
				showTime={true}
				placeholder='Start Date'
			/>
			<DatePicker
				className='width-100 mx-5'
				onChange={handleChangeEndDate}
				showTime={true}
				placeholder='End Date'
			/>
		</div>
	);
};

export { PickDate };
