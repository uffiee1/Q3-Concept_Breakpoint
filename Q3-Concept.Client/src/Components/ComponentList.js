

function ComponentList({components}) {
    return (
        <div>
            {components.map((component)=>(
                <h5> {component.name}</h5>
            ))}
        </div>
    )
}

export default ComponentList
