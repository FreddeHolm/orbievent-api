import { PropagateLoader } from "react-spinners";

export default function Loading(props) {

    const title = props.title

    return(
        <div style={{ display:"flex",justifyContent: "center" }}>
            <div style={{ display:"flex", justifyContent: "center", flexDirection: "column" }}>
                <h2>{title != null ? title : "Loading!"}</h2>
                <p align="center">This should not take more than a few secounds.</p>
                
                <div align="center"><PropagateLoader color='#ed6c62'/></div>
            </div>
        </div>
    ) 
}