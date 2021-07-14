function RelationList(props) {
    return (
      <>
        <h2 className="subTitle" >{`${props.type} (${props.list.length})`}</h2>
        <ul>
          {props.list.map((itemAtual) => props.content(itemAtual))}
        </ul>
      </>
    )
  }

  export default RelationList