## css selector combinations
- id is higher level than class


### div, p   =======   all div, all p shared same css style


### div p     ======   all p under div


### under selector 1, all 2 is...
.selector1.selector2 {
    property:value
}

### div > p   ======   direct p under div

### first child after one
h2 + a {color:red}

### first child after one shared one parent
h2 ~ a


note: attribute selectors to see more "1:01:00" in css hero
------------------------------------------------
### under li
- li.first-child {property:value}
- li.last-chhild {property:value}
- li.nth-child(n) {property:value}

- li.only-child {property:value}
- td.only-childe {property:value}    means the
------------------------------------------------
### seudo
- #somename:visted {color:red}       if visited, then...
- #somename:link {color:red}
