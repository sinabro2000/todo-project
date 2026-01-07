import { useEffect, useState } from "react";



function Backlog({ backlog }) {

    return (
        <div>
            <h2>미룬 일</h2>
            {backlog.length > 0 && (
                <ul>
                    {backlog.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </div>

    )
}

export default Backlog;