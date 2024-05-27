import styles from "./ChatSearchInput.module.css"
const ChatSearchInput = () => {
  return (
    <div className="field col-11 md:col-11">
      <div className={styles.search_container}>
        <input
          type="text"
          className={`${styles.search_input} text-base text-color surface-overlay p-2 border-1 border-solid surface-border  appearance-none outline-none focus:border-primary w-full`}
          placeholder="Search"
        />
        <i className={`${styles.pi_search} pi pi-search`}></i>
      </div>
    </div>
  );
};

export default ChatSearchInput;
