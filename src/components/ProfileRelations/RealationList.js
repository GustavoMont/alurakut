function RelationList(props) {
    return (
      <>
        <h2 className="subTitle" >{`${props.title} (${props.list.length})`}</h2>
        <ul>
          {props.list.map((itemAtual, index) => {
              if(index >= 6)
              {
                  return
              }
              return props.content(itemAtual, index)
          })}
        </ul>
      </>
    )
  }

  export default RelationList