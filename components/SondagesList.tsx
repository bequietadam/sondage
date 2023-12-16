import Link from 'next/link';
import react from 'react';
import { motion } from 'framer-motion';
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
            padding: 0;
            border: 2px dashed var(--primary);
            border-radius: 40px;
          }
          .sondage-list .item {
            padding: 2px 15px 12px;
            border-top: 2px dashed var(--primary);
          }
          .sondage-list .item:first-child {
            border: none;
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
            color: var(--border);
          }
        `}
      </style>
    </>
  )
}
