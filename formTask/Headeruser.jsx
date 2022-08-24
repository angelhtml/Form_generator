import HeaderStyle from './Headeruser.module.css';
export default function Headeruser(title){
    console.log(title)
    return(
        <div className={HeaderStyle.header}>
            <h1>{title.title}</h1>
        </div>
    )
}