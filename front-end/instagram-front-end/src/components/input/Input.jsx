import styles from './input.module.css'

const Input = ({ label,errorMessage, ...props }) => {
    let cssErrorClass = errorMessage? `${styles.error}` :''
    
    return (
        <div className={styles.inputContainer }>
            <label>{label}</label><br />
            <input {...props}  className={cssErrorClass} />
            {errorMessage && <p  className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    )
}
export default Input