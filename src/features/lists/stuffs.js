import React from 'react';
import MaterialTable from 'material-table';
import {stuffs, selectStuffs} from './listsSlice'
import { useSelector} from 'react-redux'
import { wrapDispatcher } from '../../app/utils'

const title = "اجناس"

const columns = [
	{title: 'نام', field:'name'},
	{title: 'فی خرید', field:'cost'},
	{title: 'فی فروش', field:'price'},
	{title: 'شرکت', field:'company'},
	{title: 'تولید', field:'proDate', type:'Date'},
	{title: 'انقضا', field:'proDate', type:'Date'},
]
export default function StuffsList() {
	const data = useSelector(selectStuffs)
	const {add, remove, update} = wrapDispatcher(stuffs);
	return (
		<MaterialTable
		title={title}
		columns={columns}
		data={data}
		editable={{
		onRowAdd: (newData) => add(newData),
		onRowUpdate: (newData, oldData) => update({data:newData, id:oldData.id}),
		onRowDelete: (oldData) => remove(oldData.id)
	}}
	/>
	)
}

