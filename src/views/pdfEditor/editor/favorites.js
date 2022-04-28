import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/pdfEditor/actions';
import __ from 'I18N';
import U from 'utils';

class FavoritesVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      nameValue: ''
    }
  }
  //static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.someValue!==prevState.someValue){
  //     return { someState: nextProps.someValue};
  //  }
  //  else return null;
  //}
  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.status === 'in' && prevProps.status !== 'in'){
  //     //Perform some operation here
  //     this.setState({ status: 'in'});
  //     this.setIn('in');
  //   }
  //   if(this.props.status === 'out' && prevProps.status !== 'out'){
  //     //Perform some operation here
  //     this.setState({ status: 'out'});
  //     this.setIn('out');
  //   }
  // }
  //componentDidMount(){
  //}
  toggleOpened = () => {
    this.setState({
      opened: !this.state.opened
    });
  }
  addItem = () => {
    const name = this.state.nameValue.trim();

    if(name !== ''){
      const {lastStyle,addFavorite} = this.props;
      const id = 'F_' + U.getUniqueId();
      const typeElement = lastStyle.type;
      const element = Object.assign({},lastStyle[typeElement]);

      delete element.type;
      delete element.id;
      delete element.pageNum;
      delete element.x;
      delete element.y;
      delete element.text;
  
      addFavorite(id,typeElement,name,element);
    }
  }
  selectItem = element => {
    const {elementToEditor,setElementFromEditor,updateElement,lastStyle} = this.props;
    
    if(elementToEditor){
      const elementUpdate = Object.assign({},{
        'id': elementToEditor.id,
        type: lastStyle.type
      },element);      
      
      setElementFromEditor(elementUpdate);
      updateElement(elementUpdate);
    }
    
  }
  deleteItem = id => {
    this.props.deleteFavorite(id);
  }
  render() {

    const {lastStyle,favorites} = this.props;

    const {opened,nameValue} = this.state;

    const list = [];
    if(lastStyle.type){
      for(var a in favorites){
        if(favorites[a].typeElement === lastStyle.type){
          list.push(favorites[a]);
        }
      }
    }

    return <div className={'pdfeditorpanel-editor__favorites' + (opened ? ' opened' : '')}>
      <h3>
        {__('Basics')}
        <div className="pdfed-fav_star"
          onClick={this.toggleOpened}
        >
          <i className="fa fa-star"></i>
        </div>
      </h3>
      <div className="pdfed-fav_panel">
        <div className="pdfed-fav_create">
          <div className="pdfed-fav_create-input">
            <input
              type="text"
              placeholder={__('Name')}
              value={nameValue}
              onChange={e => {
                this.setState({
                  nameValue: e.target.value
                });
              }}
            />
          </div>
          <div className="pdfed-fav_create-btn">
            <div className="btn min primary"
              onClick={this.addItem}
            >
              {__('New')}
            </div>
          </div>
        </div>
        <div className="pdfed-fav_list">
          {list.map((m,k) => {
            return <div className="pdfed-fav_list-item" key={k}>
              <div className="pdfed-fav_list-label"
                onClick={() => {
                  this.selectItem(m.element);
                }}
              >
                <i className={'fa fa-' + (m.typeElement === 'text' ? 'font' : 'stop')}></i>
                {m.name}
              </div>
              <div className="pdfed-fav_list-delete"
                onClick={() => {
                  this.deleteItem(m.id);
                }}
              >
                <i className="fa fa-times"></i>
              </div>
            </div>;
          })}
          {list.length === 0 ? <div className="pdfed-fav_list-empty">
            {__('Without Favorites')}
          </div> : null}
        </div>
      </div>
    </div>;
  }
};

/* REDUX ***************************/

const {  
  addFavorite,
  deleteFavorite,
  setElementFromEditor,
  updateElement
} = actions;

function mapStateToProps(state) {
  const {lastStyle,favorites,elementToEditor} = state.PDFEditor;
  return {lastStyle,favorites,elementToEditor};
}
const mapDispatchToProps = dispatch => {
	return {
    addFavorite: (id,typeElement,name,element) => {
      dispatch(addFavorite(id,typeElement,name,element))
    },
    deleteFavorite: (id) => {
      dispatch(deleteFavorite(id))
    },
    setElementFromEditor: (element) => {
      dispatch(setElementFromEditor(element))
    },
    updateElement: (elementData) => {
      dispatch(updateElement(elementData))
    }
	}
}

const Favorites = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesVisual);

export default Favorites;