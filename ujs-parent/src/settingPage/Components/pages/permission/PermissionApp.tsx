import React, { Component, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const PermissionApp = () => {
    this.state = {
        permission: [
            {
                name: 'example1',
                checked: false
            },
            {
                name: 'example2',
                checked: false
            },
            {
                name: 'example3',
                checked: false
            },
            {
                name: 'example4',
                checked: false
            },
        ],
        search: ''
    }
    props: any;
    handleChange = (e) => {
        this.setState({
            [e.target.search]: e.target.value
        })
    }
    const defaultOptions = {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
        allowedAttributes: {
          'a': [ 'href' ]
        },
      };
      
      const sanitize = (dirty, options) => ({
        __html: sanitizeHtml(
          dirty, 
          { ...defaultOptions, ...options }
        )
      });
    return(
        <div>
            <input 
                placeholder="이름"
                value={sanitizeHtml(this.state.name)}
                onChange={this.handleChange}
                name="name"
            />
        </div>
    );
}

export default PermissionApp;