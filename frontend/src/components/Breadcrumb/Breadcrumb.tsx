import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const { Item } = Breadcrumb;

const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return pathnames.length > 0 ? (
    <div className="bg-gray-100 border border-gray-300 rounded-md content-center p-3 mb-5">
      <Breadcrumb className="flex">
        <Item>
          <Link to="/">Home</Link>
        </Item>

        {pathnames.map((path, i) => {
          if (i < pathnames.length - 1) {
            return (
              <Item key={i}>
                <Link to={`/${path}`}>{path.replace(/^\w/, (c: any) => c.toUpperCase())}</Link>
              </Item>
            );
          } else {
            return (
              <Item className="grid" key={i}>
                <div className="truncate w-full">{path.replace(/^\w/, (c: any) => c.toUpperCase())}</div>
              </Item>
            );
          }
        })}
      </Breadcrumb>
    </div>
  ) : null;
};

export default Breadcrumbs;
