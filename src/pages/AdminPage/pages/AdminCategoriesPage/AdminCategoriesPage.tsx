import React, { useEffect } from 'react';
import { IRootState, useAppDispatch } from '../../../../store';
import { getCategories } from '../../../../store/category/actionCreators';
import { useSelector } from 'react-redux';
import { createCategory, deleteCategory } from '../../../../api/admin';
import { Button } from 'antd';

import styles from "../../AdminPage.module.css"
import { ICategory } from '../../../../api/category/types';
import CategoryBadge from '../../../../components/CategoryBadge/CategoryBadge';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const AdminCategoriesPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategories());
    },[]);

    const categories = useSelector((state: IRootState) => state.category.categoriesData.categories);

    function handleDeleteCategory(data:{categoryId:number}){
        deleteCategory(data).then(()=>{
          dispatch(getCategories());
        });
      }

      const CategoryContent = ({text,categoryId}:{text:string,categoryId:number})=>{
        return <div style={{position:"relative",width:"200px",display:"flex",alignItems:"center"}}>
          <span>{text}</span>
          <Button style={{backgroundColor:"rgba(0, 0, 0, 0)",border:"none",color:"white",position:"absolute",right:"0"}} shape="circle" icon={<CloseOutlined/>} onClick={()=>handleDeleteCategory({categoryId})} />
        </div>
      }
    
      const CreateCategoryContent = ({text}:{text:string})=>{
        const [input,setInput] = React.useState('');
    
        function changeHandle(event:React.ChangeEvent<HTMLInputElement>){
          setInput(event.target.value);
        }
    
        function handleCreateCategory(){
          createCategory({name:input}).then(()=>{
            dispatch(getCategories());
          }).catch(console.log)
        }
    
        return <div style={{position:"relative",width:"200px",display:"flex",alignItems:"center"}}>
          <input placeholder={text} value={input} className={styles.input} onChange={changeHandle}></input>
          <Button style={{backgroundColor:"rgba(0, 0, 0, 0)",border:"none",color:"white",position:"absolute",right:"0"}} shape="circle" icon={<PlusOutlined/>} onClick={handleCreateCategory}/>
        </div>
      }
    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"20vh"}}>
            <div style={{ margin: "20px" }}><CategoryBadge id={categories ? categories[categories?.length - 1].id + 1 : 1} width={"300px"} height="40px" children={<CreateCategoryContent text={"Add category"} />} /></div>
            {categories?.map((e: ICategory, index) => <div key={e.id} style={{ margin: "20px" }}><CategoryBadge id={index} children={<CategoryContent text={e.name} categoryId={e.id} />} width={"300px"} height="40px" /></div>)}

        </div>
    );
};

export default AdminCategoriesPage;