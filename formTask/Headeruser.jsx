import HeaderStyle from './Headeruser.module.css';

export default function Headeruser(title){
    return(
        <div className={HeaderStyle.header}>
            <h1>{title.title}</h1>
        </div>
    )
}
