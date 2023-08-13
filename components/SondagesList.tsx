import Link from 'next/link';
import react from 'react';
import Button from './Button';
import useHandleDeleteSondage from '../hooks/useHandleDelete';

type SondagesListProps = {
  sondages: Sondage[],
}

export default function SondagesList({ sondages }: SondagesListProps) {

  const handleDeleteSondage = useHandleDeleteSondage();

  return (
    <>
      <ul className="sondage-list">
        {sondages.length > 0 ?
          sondages.map((sondage, index) => {
            return (
              <li key={index} className="item">
                <div className="details">
                  <h2>{sondage.title}</h2>
                  <p>{sondage.description}</p>
                </div>
                <div className="actions">
                  <Link className="link" href={`/sondages/${sondage._id}`}>Edit</Link>
                  <Button size="small"><Link href={`/sondages/play/${sondage._id}`}>Play</Link></Button>
                  <Button size="small"><Link href={`/sondages/result/${sondage._id}`}>Result</Link></Button>
                  <Button size="small" onClick={() => handleDeleteSondage(sondage._id as string)}>Delete
                  </Button>
                </div>
              </li>
            );
          })
          : (
            <h2 className="heading">Ooops! No sondages added so far</h2>
          )}
      </ul>
      <style jsx>
        {`
          .sondage-list {
            list-style-type: none;
            display: block;
            padding: 6px 0 12px;
          }
          .sondage-list .item {
            padding: 0 10px 10px;
            border: 1px solid #d5d5d5;
            margin-bottom: -1px;
          }
          .sondage-list .item:last-child {
            margin-bottom: 0px;
          }
          .sondage-list .item h2 {
            margin: 10px 0px;
          }
          .sondage-list .item .actions {
            display: flex;
            justify-content: flex-end;
          }
          .sondage-list .item .actions > :global(a) {
            text-decoration: none;
            margin-right: auto;
          }
          .sondage-list .item .actions :global(button) {
            margin-left: 2px;
          }

          .sondage-list h2.heading {
            color: #ddd;
          }
        `}
      </style>
    </>
  )
}
