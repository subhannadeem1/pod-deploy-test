const TranscriptTabsComponent = (props: any) => {
    const { tabIndex, setTabIndex } = props
  
    return (
      <div className="overflow-hidden bg-white shadow -mx-4 sm:mx-0" data-nosnippet>
        <div className="text-sm font-medium text-center bg-gray-50 text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px ml-4">
            
            {/* Transcript Tab */}
            <li className="mr-2">
              <a
                href="#"
                data-nosnippet
                className={`
                  inline-block p-3 border-b-2 border-transparent 
                  transition-colors duration-200 
                  ${
                    tabIndex === 0
                      ? "border-teal-200 text-black"
                      : "hover:text-black"
                  }
                `}
                onClick={(e) => {
                  e.preventDefault()
                  setTabIndex(0)
                }}
              >
                Transcript
              </a>
            </li>
  
            {/* Summary Tab */}
            <li className="mr-2">
              <a
                href="#"
                data-nosnippet
                className={`
                  inline-block p-3 border-b-2 border-transparent 
                  transition-colors duration-200 
                  ${
                    tabIndex === 2
                      ? "border-teal-200 text-black"
                      : "hover:text-black"
                  }
                `}
                onClick={(e) => {
                  e.preventDefault()
                  setTabIndex(2)
                }}
              >
                Summary
              </a>
            </li>
  
            {/* Suggested Reading Tab */}
            <li className="mr-2">
              <a
                href="#"
                data-nosnippet
                className={`
                  inline-block p-3 border-b-2 border-transparent 
                  transition-colors duration-200 
                  ${
                    tabIndex === 1
                      ? "border-teal-200 text-black"
                      : "hover:text-black"
                  }
                `}
                onClick={(e) => {
                  e.preventDefault()
                  setTabIndex(1)
                }}
              >
                References
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  
  export default TranscriptTabsComponent
  