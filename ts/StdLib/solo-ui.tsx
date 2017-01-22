import * as _React from "react"
import * as _ReactDOM from "react-dom"
import * as _ReactRouter  from 'react-router'
import * as _MaterialUI from 'material-ui'
const _ReactLayout = require('react-layout-components')

export const React = _React
export const ReactDOM = _ReactDOM
export const ReactRouter = _ReactRouter
export const MaterialUI = _MaterialUI
export const ReactLayout = _ReactLayout


const { Router, Route, hashHistory } = ReactRouter
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


export class Main {
    static bootstrap(router: JSX.Element, id: string, use_redux: boolean = false, 
                     Provider: (any, his:any)=>JSX.Element = null) {
        let main = new Main(id, use_redux)
        main.render(router, Provider)
    }

    constructor(id: string, use_redux: boolean) {
        this.ctn_id = id
        this.use_redux = use_redux
    }

    render_data(router: JSX.Element): JSX.Element {
        if (this.use_redux) return router // use redux router 
        return <Router history={hashHistory}>
                {router}
            </Router>
    }

    render(router: JSX.Element, Provider: (any, his:any) => JSX.Element = null): void {
        let nodes = this.render_data(router)
        
        if (this.use_redux) {
            nodes = Provider(nodes, hashHistory)
        }
        ReactDOM.render(
            <MuiThemeProvider>
                {nodes}
            </MuiThemeProvider>,            
            document.getElementById(this.ctn_id)
        );
    }
    
    private ctn_id: string
    private use_redux: boolean
}





