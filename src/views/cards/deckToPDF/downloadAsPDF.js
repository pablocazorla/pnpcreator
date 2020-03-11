import React, { Component } from 'react';
import __ from 'I18N';

export default class DownloadAsPDFVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
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
  downloadAsPDF = () => {
    const {loading} = this.state;
    if(window && window.pdfMake && !loading){
      const {images,pageSize,rotated,filename} = this.props;
      
      let imageList = [];
      for(var a in images){
        imageList.push({
          order: a,
          src: images[a]
        });
      }
      imageList.sort((a,b)=>{
        return a.order < b.order ? -1:1;
      });

      const widthPage = pageSize === 'A4' ?
        (rotated === '0' ? 595 : 842) : 
        (rotated === '0' ? 842 : 1190); 
      // A4 0 -> 595
      // A3 0 -> 842
      // A4 1 -> 842
      // A3 1 -> 1190
      
      //pageSize === 'A3' ? 1190 : 595;

      let content = imageList.map(op => {
        return {
          image: op.src,
          width: widthPage,
          pageBreak: 'after'
        }
      });

      delete content[content.length-1].pageBreak;

      const docDefinition = {
        info: {
            title: filename !== '' ? filename :'PNP',
            author: 'pnp',
            subject: 'pnp',
            keywords: 'pnp',
        },
        pageSize: pageSize,
        pageOrientation: rotated === '1' ? 'landscape' : 'portrait',
        pageMargins: [0, 0, 0, 0],
        compress: false,
        content
      };

      const self = this;
      this.setState({
        loading: true
      });
      setTimeout(function(){
        window
        .pdfMake
        .createPdf(docDefinition)
        .download(docDefinition.info.title, function () {
          self.setState({
            loading: false
          });
        });
      },200); 

    }
  }
  render() {
    const {loading} = this.state;

    return <div className={'btn primary' + (loading ? ' disabled' : '')}
      onClick={this.downloadAsPDF}
    ><i className={loading ? 'fa fa-refresh fa-spin fa-fw' : 'fa fa-download'}></i>
      {loading ? __('Downloading') : __('Download as PDF')}</div>;
  }
};