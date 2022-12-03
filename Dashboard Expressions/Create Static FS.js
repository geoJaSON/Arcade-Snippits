var fset = {
    fields: [
        { name: "url", type: "esriFieldTypeString" },
        { name: "type", type: "esriFieldTypeString" }

    ],
    'geometryType': '',
    'features':[
        {'attributes':
            {'type':'Chart','url':'https://www.nhc.noaa.gov/xgtwo/two_atl_5d0.png'}
        },
        {'attributes':
            {'type':'Satellite','url':'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/taw/Sandwich/GOES16-TAW-Sandwich-900x540.gif'}
        },
        {'attributes':
            {'type':'Outlook','url':'https://www.ospo.noaa.gov/data/ocean/ohc/images/ohc_naQG3_ddc.gif'}
        },
        {'attributes':
            {'type':'Live Photo','url':''}
        },
        {'attributes':
            {'type':'Live Video','url':''}
        }
        
    ]
};

return FeatureSet(Text(fset));
